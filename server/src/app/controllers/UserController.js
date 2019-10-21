import * as Yup from 'yup';
import Sequelize from 'sequelize';
import User from '../models/User';

class UserController {
  /**
   * List users
   */
  async index(req, res) {
    const whereStatement = {
      id: { [Sequelize.Op.not]: req.userId },
    };

    if (req.query.search) {
      whereStatement.name = {
        [Sequelize.Op.like]: `%${req.query.search}%`,
      };
    }

    const users = await User.findAll({
      where: whereStatement,
      attributes: ['id', 'name', 'cpf', 'phone'],
    });

    return res.json(users);
  }

  /**
   * Create users
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      phone: Yup.string(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { cpf } = req.body;

    const checkCpf = await User.findOne({ where: { cpf } });

    if (checkCpf) {
      return res.status(400).json({ error: 'Duplicated cpf' });
    }

    const { id, name, phone } = await User.create(req.body);

    return res.json({
      id,
      name,
      cpf,
      phone,
    });
  }

  /**
   * Update logged user
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      phone: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { cpf, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (cpf !== user.cpf) {
      const userExists = await User.findOne({ where: { cpf } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, phone, balance, credit } = await user.update(req.body);

    return res.json({
      id,
      name,
      cpf,
      phone,
      balance,
      credit,
    });
  }

  /**
   * Delete logged user
   */
  async destroy(req, res) {
    const result = await User.destroy({
      where: { id: req.userId },
    });

    return res.json(result);
  }
}

export default new UserController();
