
Ext4.Loader.setConfig({
    enabled: true,
    paths: {"HSRS":'/js/layman/lib/'}
});

Ext4.require([ "Ext4.tree.*", 'HSRS.*' ]);

var lm;

HSRS.IMAGE_LOCATION = "/js/layman/lib/imgs/";
//HSRS.ProxyHost = "/cgi-bin/hsproxy.cgi?url=";
HSRS.STYLERURL = "http://liferay.local/styler/?wms=http://liferay.local/geoserver/{workspace}/ows/{workspace}&wmslayer={layerData.name}";
HSRS.VIEWURL = "http://liferay.local/?wms=http://liferay.local/geoserver/{workspace}/ows/{workspace}&wmslayers={layerData.name}";


var init = function() {
    Proj4js.libPath = "/wwwlibs/proj4js/";

    // Languages, save to cookie
    HS.setLang(HS.getLang(), true);

    var headerHeight = 0;

    var northDIV = ['#banner', '#navigation'];

    for (idiv = 0; idiv < northDIV.length; idiv++) {
        if (Ext4.select(northDIV[idiv]).getCount() > 0) {
            headerHeight += Ext4.select(northDIV[idiv]).elements[0].clientHeight
        }
    }
    var windowHeight = document.body.parentNode.clientHeight;

    var mapHeight = windowHeight - headerHeight - 175;


    lm = Ext4.create("HSRS.LayerManager",{
        url: "http://liferay.local/cgi-bin/layman/layman",
        height: mapHeight,
        srid: "EPSG:4326",
        renderTo: "data"
    });

};

window.addEventListener ? window.addEventListener('load', init, false) : window.attachEvent('onload', init);
