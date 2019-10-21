import * as Yup from 'yup';
import Sequelize from 'sequelize';

import Transaction from '../models/Transaction';
import User from '../models/User';

class TransactionController {
  /**
   * List transations
   */
  async index(req, res) {
    const transactions = await Transaction.findAll({
      where: {
        [Sequelize.Op.or]: [
          { user_id: req.userId },
          { favored_id: req.userId },
        ],
      },
      include: ['favored', 'user'],
      order: [['createdAt', 'DESC']],
    });

    return res.json(transactions);
  }

  /**
   * Create transaction
   */
  async store(req, res, next) {
    const schema = Yup.object().shape({
      amount: Yup.number()
        .min(0.01)
        .required(),
      favored_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { amount, favored_id } = req.body;

    /**
     * Checar se usuario tem valor suficiente para essa transação
     */
    const user = await User.findByPk(req.userId);

    if (user.balance + user.credit < amount) {
      return res.status(401).json({ error: 'Insufficient funds' });
    }

    if (user.balance >= amount) {
      // Tirar somente do saldo
      try {
        await user.update({ balance: user.balance - amount });
      } catch (error) {
        return next(error);
      }
    } else {
      // Tirar parte do saldo(se possível)
      // E tirar o restante do crédito
      const difference = amount - user.balance;

      try {
        await user.update({
          credit: user.credit - difference,
          balance: 0,
        });
      } catch (error) {
        return next(error);
      }
    }

    /**
     * Check if last transaction was made in less than 2 minutes
     */
    const lastTransaction = await Transaction.findOne({
      where: {
        user_id: req.userId,
        favored_id,
        amount,
      },
      order: [['createdAt', 'DESC']],
    });

    // Se não for a primeira transação
    if (lastTransaction) {
      const differenceMinutes =
        (lastTransaction.createdAt - new Date()) / 60000;

      // Data da última transação é maior que 2 minutos em relação a data atual
      if (differenceMinutes > -2) {
        try {
          // Excluir última transação
          await Transaction.destroy({
            where: { id: lastTransaction.id },
          });
        } catch (error) {
          return next(error);
        }
      }
    }

    /**
     * Add balance to favored user
     */
    try {
      await User.increment(
        {
          balance: amount,
        },
        { where: { id: favored_id } }
      );
    } catch (error) {
      return next(error);
    }

    /**
     * Cria registro na tabela do model deste controller
     */
    try {
      const transaction = await Transaction.create({
        user_id: req.userId,
        amount,
        favored_id,
      });

      return res.json({ transaction, user });
    } catch (error) {
      return next(error);
    }
  }
}

export default new TransactionController();
