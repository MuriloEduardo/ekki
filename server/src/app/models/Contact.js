import { Model } from 'sequelize';

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    this.belongsTo(models.User, {
      foreignKey: 'contact_id',
      as: 'user_contact',
    });
  }
}

export default Contact;
