module.exports = (sequelize, DataTypes) => {
  const itineraryItem = sequelize.define(
    'itineraryItem',
    {
      itineraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'itinerary', key: 'id' },
      },
      itemId: {
        type: DataTypes.INTEGER, // Will store the ID of a Flight, Hotel, or Site
      },
      type: {
        type: DataTypes.STRING, // Will store the type: 'Flight', 'Hotel', 'Site'
      },
    },
    { timestamps: true }
  );

  itineraryItem.associate = (models) => {
    itineraryItem.belongsTo(models.itinerary, { foreignKey: 'itineraryId' });
  };

  return itineraryItem;
};
