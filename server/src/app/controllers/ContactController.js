import * as Yup from 'yup';
import Contact from '../models/Contact';
import User from '../models/User';

class ContactController {
  /**
   * List contacts
   */
  async index(req, res) {
    const contacts = await Contact.findAll({
      where: { user_id: req.userId },
      include: 'contact',
    });

    return res.json(contacts);
  }

  /**
   * Create contact
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      contact_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { contact_id } = req.body;

    /**
     * Check if contact is different of user
     */
    if (contact_id === req.userId) {
      return res
        .status(401)
        .json({ error: "You can't have a contact with yourself" });
    }

    /**
     * Check if relationship exists
     */
    const checkExists = await Contact.findOne({
      where: { user_id: req.userId, contact_id },
    });

    if (checkExists) {
      return res.status(400).json({ error: 'Contact alread exists' });
    }

    const { id, user_id } = await Contact.create({
      user_id: req.userId,
      contact_id,
    });

    const contact = await User.findByPk(contact_id);

    return res.json({
      id,
      user_id,
      contact_id,
      contact,
    });
  }

  /**
   * Delete contact
   */
  async destroy(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;

    /**
     * Check if contact exists
     */
    const checkExists = await Contact.findOne({
      where: { user_id: req.userId, id },
    });

    if (!checkExists) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const result = await Contact.destroy({
      where: { user_id: req.userId, id },
    });

    return res.json(result);
  }
}

export default new ContactController();
