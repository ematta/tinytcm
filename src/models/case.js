import { DataTypes } from "sequelize";

export const Case = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isAutomated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  createDateTime: {
    type: DataTypes.NOW,
    allowNull: false,
  },
  updateDateTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};