Ext4.define('HSRS.LayerManager.FilesPanel.FileUploader', {

    extend: 'Ext4.form.Panel',

    /**
     * already available files for later check for existing files
     * @type [ {String}]
     */
    filesnames: undefined,

    /**
     * @constructor
     */
     constructor: function(config) {

        config.frame = true;
        config.filesnames = config.filesnames || [];
        config.html = HS.i18n("Please, select file to upload. File can be either single file (e.g. KML) or zipped multi-file (such as ESRI Shapefile)");
        config.items = [
        //{
        //    xtype: 'textfield',
        //    id: 'file_name',
        //    //emptyText: '(leave blank for use file name)',
        //    fieldLabel: 'New file name',
        //    name: 'newfilename',
        //    width: 350,
        //    labelWidth: 120,
        //    allowBlank: true
        //},
        //{
        //    xtype: "checkbox",
        //    id: 'ovewrite',
        //    fieldLabel: 'Overwrite existing',
        //    name: 'overwrite',
        //    labelWidth: 120
        //},
        {
            xtype: 'filefield',
            id: 'form-file',
            emptyText: HS.i18n('Select a file'),
            fieldLabel: HS.i18n('File'),
            name: 'filename',
            //buttonText: '',
            width: 350,
            msgTarget: 'side',
            labelWidth: 120,
            allowBlank: false
            //buttonConfig: {
            //    icon: HSRS.IMAGE_LOCATION+"/page_add.png"
            //}
        }];

        config.buttons = [{
            text: HS.i18n('Save'),
            scope: this,
            handler: function() {
                var form = this.getForm();
                if (this._onBeforeSubmit() === false) {
                    return false;
                }
                if (form.isValid()) {
                    form.submit({
                        scope: this,
                        url: config.url,
                        waitMsg: HS.i18n('Uploading files to server ...'),
                        success: function(form, action) {
                            this.fireEvent('filesaved', action);
                            if (action.result && action.result.file) {
                                Ext.Msg.alert(HS.i18n('Success'),
                                    (action.result && action.result.file ? HS.i18n('File uploaded') + ' "' + action.result.file + '"' : HS.i18n('No Server response.')));
                            }
                        },
                        failure: function(form, action) {
                            this.fireEvent('filesaved', action);
                            Ext.Msg.alert(HS.i18n('Failed'), action.result ? action.result.message : HS.i18n('No response'));
                        }
                    });
                }
            }
        },{
            text: HS.i18n('Reset'),
            handler: function() {
                this.up('form').getForm().reset();
            }
        }];

        this.callParent(arguments);

        this.addEvents('filesaved');

     },

     /**
      * on before submit event handler
      * @private
      * @function
      */
     _onBeforeSubmit: function() {
        var form = this.getForm();
        var values = form.getValues();

        // make sure, file name does not exist yet
        var filename = values.newfilename || this.items.get(0).value.replace('C:\\fakepath\\', '');

        if (this.filesnames.indexOf(filename) > -1 ||
            this.filesnames.indexOf(filename + '.shp') > -1) {
            Ext4.MessageBox.alert(HS.i18n('File name exists'),
                    HS.i18n('File name [')+ filename + HS.i18n('] exists, choose different name.'));
            return false;
        }
     }
});
