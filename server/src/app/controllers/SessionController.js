import * as Yup from 'yup';

import User from '../models/User';

class SessionController {
  /**
   * Create session
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { cpf, password } = req.body;

    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, phone, balance, credit } = user;

    return res.json({
      user: {
        id,
        name,
        cpf,
        phone,
        balance,
        credit,
      },
      token: user.generateToken(),
    });
  }
}

export default new SessionController();
