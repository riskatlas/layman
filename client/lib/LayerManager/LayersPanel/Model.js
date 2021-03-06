Ext4.define('HSRSLayerObject', {
        extend: 'Ext4.Base',
        resource: undefined,
        name: undefined,
        style: undefined,
        attribution: undefined,
        type: undefined,
        constructor: function(config) {
            Ext4.Object.merge(this, config);
            this.callParent(arguments);
        }
});

Ext4.define('HSRSLayerDataObject', {
        extend: 'Ext4.Base',
        aaa: 'CoverageTypeObject',
        nativeBoundingBox: undefined, //
        nativeCRS: undefined, //
        description: undefined, //
        title: undefined, //
        latLonBoundingBox: undefined, //
        enabled: undefined, //
        namespace: undefined, //
        projectionPolicy: undefined, //
        srs: undefined, //
        nativeName: undefined, //
        store: undefined, //
        name: undefined, //
        // datatype: undefined, // should not be here
        constructor: function(config) {
            Ext4.Object.merge(this, config);
            this.callParent(arguments);
        }
});

Ext4.data.Types.TYPELAYER = {
    convert: function(v, model) {
        var l = new HSRSLayerObject(v);
        return l;
    },
    sortType: function(v) {
        return v.name;  // When sorting, order by latitude
    },
    type: 'LayerObject'
};

Ext4.data.Types.LAYERDATATYPE = {
    convert: function(v, model) {
        return new HSRSLayerDataObject(v);
    },
    sortType: function(v) {
        return v.title;  // When sorting, order by latitude
    },
    type: 'LayerDataType'
};

Ext4.define('HSRS.LayerManager.LayersPanel.Model', {
        extend: 'Ext4.data.Model',
        fields: [
            {name: 'workspace', mapping: 'ws', type: Ext4.data.Types.STRING},
            {name: 'wstitle', mapping: 'roleTitle', type: Ext4.data.Types.STRING},
            {name: 'layer', mapping: 'layer', type: Ext4.data.Types.TYPELAYER},
            {name: 'layerData', mapping: 'layerData', type: Ext4.data.Types.LAYERDATATYPE},
            {name: 'title', mapping: 'layerData.title', type: Ext4.data.Types.STRING},
            {name: 'name',  mapping: 'layerData.name', type: Ext4.data.Types.STRING}
        ]

});

