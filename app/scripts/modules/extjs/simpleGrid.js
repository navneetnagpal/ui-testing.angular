var simpleGrid = (function() {

    return {
        init: function() {

            /*!
             * Ext JS Library 3.4.0
             * Copyright(c) 2006-2011 Sencha Inc.
             * licensing@sencha.com
             * http://www.sencha.com/license
             */
            Ext.onReady(function() {
                Ext.QuickTips.init();

                // NOTE: This is an example showing simple state management. During development,
                // it is generally best to disable state management as dynamically-generated ids
                // can change across page loads, leading to unpredictable results.  The developer
                // should ensure that stable state ids are set for stateful components in real apps.    
                Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

                // sample static data for the store

                var myData = [

                ];
                for (var count = 1000 - 1; count >= 0; count--) {
                	myData.push( ['Alcoa Inc'+ count, 29.01, 0.42, 1.47, '9/1 12:00am']);
                };
                /**
                 * Custom function used for column renderer
                 * @param {Object} val
                 */
                function change(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '</span>';
                    }
                    return val;
                }

                /**
                 * Custom function used for column renderer
                 * @param {Object} val
                 */
                function pctChange(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '%</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '%</span>';
                    }
                    return val;
                }

                // create the data store
                var store = new Ext.data.ArrayStore({
                    fields: [{
                        name: 'company'
                    }, {
                        name: 'price',
                        type: 'float'
                    }, {
                        name: 'change',
                        type: 'float'
                    }, {
                        name: 'pctChange',
                        type: 'float'
                    }, {
                        name: 'lastChange',
                        type: 'date',
                        dateFormat: 'n/j h:ia'
                    }]
                });

                // manually load local data
                store.loadData(myData);

                // create the Grid
                window.grid = new Ext.grid.GridPanel({
                    store: store,
                    columns: [{
                        id: 'company',
                        header: 'Company',
                        width: 160,
                        sortable: true,
                        dataIndex: 'company'
                    }, {
                        header: 'Price',
                        width: 75,
                        sortable: true,
                        renderer: 'usMoney',
                        dataIndex: 'price'
                    }, {
                        header: 'Change',
                        width: 75,
                        sortable: true,
                        renderer: change,
                        dataIndex: 'change'
                    }, {
                        header: '% Change',
                        width: 75,
                        sortable: true,
                        renderer: pctChange,
                        dataIndex: 'pctChange'
                    }, {
                        header: 'Last Updated',
                        width: 85,
                        sortable: true,
                        renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                        dataIndex: 'lastChange'
                    }, {
                        xtype: 'actioncolumn',
                        width: 50,
                        items: [{
                            icon: '../shared/icons/fam/delete.gif', // Use a URL in the icon config
                            tooltip: 'Sell stock',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = store.getAt(rowIndex);
                                alert("Sell " + rec.get('company'));
                            }
                        }, {
                            getClass: function(v, meta, rec) { // Or return a class from a function
                                if (rec.get('change') < 0) {
                                    this.items[1].tooltip = 'Do not buy!';
                                    return 'alert-col';
                                } else {
                                    this.items[1].tooltip = 'Buy stock';
                                    return 'buy-col';
                                }
                            },
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = store.getAt(rowIndex);
                                alert("Buy " + rec.get('company'));
                            }
                        }]
                    }],
                    stripeRows: true,
                    autoExpandColumn: 'company',
                    height: 350,
                    width: 600,
                    deferRowRender :true,
                    title: 'Array Grid',
                    // enableDragDrop: true,
                    // config options for stateful behavior
                    stateful: true,
                    stateId: 'grid',
                    ignoreself:false
                });

                // render the grid to the specified div in the page
                grid.render('grid-example');
            });


        }
    }

})()