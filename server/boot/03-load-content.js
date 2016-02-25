'use strict';

// to enable these logs set `DEBUG=boot:03-load-content` or `DEBUG=boot:*`
var log = require('debug')('boot:03-load-content');

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  log('Creating categories and products');

  var Category = app.models.Category;
  var Product = app.models.Product;

  Category.findOrCreate(
    {where:{name: 'mongoDB'}}, // find
    {name: 'mongoDB'}, // create
    function(err, category, created) {
      if (err) {
        console.error('err', err);
      }
      (created) ? log('created Category', category.name)
                : log('found Category', category.name);
      Product.findOrCreate(
        {where:{name: 'Draft mongoDB'}}, // find
        {
          name: 'Draft mongoDB',
          price: '250',
          percentage: '5',
          categoryId: category.id
        }, // create
        function(err, data, created) {
          if (err) {
            console.error('err', err);
          }
          (created) ? log('created Product', data.name)
                    : log('found Product', data.name);
        });
      Product.findOrCreate(
        {where:{name: 'Bottled mongoDB'}}, // find
        {
          name: 'Bottled mongoDB',
          price: '350',
          percentage: '5',
          categoryId: category.id
        }, //create
        function(err, data, created) {
          if (err) {
            console.error('err', err);
          }
          (created) ? log('created Product', data.name)
                    : log('found Product', data.name);
        });
    });

  Category.findOrCreate({where:{name: 'AngularJS'}},{
    name: 'AngularJS'
  }, function(err, category, created) {
    if (err) {
      console.error('err', err);
    }
    (created) ? log('created Category', category.name)
              : log('found Category', category.name);
    Product.findOrCreate({where:{name: 'Red AngularJS'}},{
      name: 'Red AngularJS',
      price: '350',
      percentage: '12',
      categoryId: category.id
    }, function(err, data, created) {
      if (err) {
        console.error('err', err);
      }
      (created) ? log('created Product', data.name)
                : log('found Product', data.name);
    });
    Product.findOrCreate({where:{name: 'White AngularJS'}},{
      name: 'White AngularJS',
      price: '350',
      percentage: '12',
      categoryId: category.id
    }, function(err, data, created) {
      if (err) {
        console.error('err', err);
      }
      (created) ? log('created Product', data.name)
                : log('found Product', data.name);
    });
  });

};
