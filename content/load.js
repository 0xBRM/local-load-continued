const EXTENSION_ID = "{}";
const EXTENSION_NAME = "localload";
const CHROME_NAME = "localload";
const VERSION = "1.1.0";
const SERVICE_NAME = EXTENSION_NAME + " Service";
const SERVICE_CTRID = "@getlocalload.com/localload-service;1";
const SERVICE_ID ="{1e2301c3-2891-44c6-89ac-e3a3de499ba7}";
const SERVICE_CID = Components.ID(SERVICE_ID);

const Ci = Components.interfaces;
const Cc = Components.classes;
const Cu = Components.utils;
const IOS = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
const OS = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
const CS = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);
const LOADER = Cc["@mozilla.org/moz/jssubscript-loader;1"].getService(Ci.mozIJSSubScriptLoader);

var ResProt = IOS.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
ResProt.setSubstitution('localload', IOS.newURI("chrome:localload/content/libraries/", null, null));

LOADER.loadSubScript("chrome://localload/content/libraries.js");

Cu.import("resource://gre/modules/XPCOMUtils.jsm");

function LocalLoad() {};

LocalLoad.prototype = {
	classDescription: EXTENSION_NAME,
	contractID: SERVICE_CTRID,
	classID: SERVICE_CID,
	QueryInterface: XPCOMUtils.generateQI([Ci.nsIContentPolicy, Ci.nsIObserverService]),
	_xpcom_categories: [{category: "content-policy"}],

	shouldLoad: function(contentType, contentLocation, requestOrigin, node, mimeTypeGuess, extra) {
		if (contentType == Ci.nsIContentPolicy.TYPE_SCRIPT && node.nodeName == '#document' && contentLocation.host != 'pdf.js' && requestOrigin.host != 'pdf.js') {
			return Ci.nsIContentPolicy.REJECT_OTHER;
		}
		var replaced = false;
		if (contentType == Ci.nsIContentPolicy.TYPE_SCRIPT && node instanceof Ci.nsIDOMHTMLScriptElement && node.hasAttribute('data-replacement') && node.getAttribute('data-replacement') == 'true' ) {
			switch (node.getAttribute('data-script')) {
				case "ext-core":
					replaced = this.replacement(node, EXT_CORE_PATH, EXT_CORE_VERSIONS, 'ext-core-debug.js');
					break;
				case "jquery":
					replaced = this.replacement(node, JQUERY_PATH, JQUERY_VERSIONS, 'jquery.js');
					break;
				case "jqueryui":
					replaced = this.replacement(node, JQUERYUI_PATH, JQUERYUI_VERSIONS, 'jquery-ui.js');
					break;
				case "mootools":
					replaced = this.replacement(node, MOOTOOLS_PATH, MOOTOOLS_VERSIONS, 'mootools.js');
					break;
				case "prototype":
					replaced = this.replacement(node, PROTOTYPE_PATH, PROTOTYPE_VERSIONS, 'prototype.js');
					break;
				case "scriptaculous":
					replaced = this.replacement(node, SCRIPTACULOUS_PATH, SCRIPTACULOUS_VERSIONS, 'scriptaculous.js');
					break;
				case "swfobject":
					replaced = this.replacement(node, SWFOBJECT_PATH, SWFOBJEC_VERSIONS, 'swfobject_src.js');
					break;
				case "yui":
					replaced = this.replacement(node, YUI_PATH, YUI_VERSIONS, 'yuiloader.js');
					break;
				case "webfontloader":
					replaced =this.replacement (node, WEBFONTLOADER_PATH, WEBFONTLOADER_VERSIONS, 'webfontloader.js');
					break;
			}
		}
		if (replaced) {
			return Ci.nsIContentPolicy.REJECT_OTHER;
		} else {
			return Ci.nsIContentPolicy.ACCEPT;
		}
	},

	shouldProcess: function(contentType, contentLocation, requestOrigin, context, mimeTypeGuess, extra){
		return Ci.nsIContentPolicy.ACCEPT;
	},

	replacement : function (script, path, versions, filename) {
		var version = script.getAttribute('data-version'), found = false, src, s, parent;
		if (version == 'latest') {
			version = versions[versions.length-1];
			found = true;
		} else {
			for (var i = 0, ver; ver= versions[i]; i++) {
				if (ver = version) {
					found = true;
					break;
				}
			}
		}
		if (found) {
			src = path + version + '/' + filename;
			s = script.ownerDocument.createElement('script');
			s.src = src;
			s.setAttribute('data-replaced', true);
			s.setAttribute('data-version', version);
			s.setAttribute('data-script', script.getAttribute('data-script'));
			script.parentNode.replaceChild(s, script);
		}
		return found;
	}
};

function NSGetModule(compMgr, fileSpec) {
	XPCOMUtils.generateModule([LocalLoad]);
}

/**
* XPCOMUtils.generateNSGetFactory was introduced in Mozilla 2 (Firefox 4).
* XPCOMUtils.generateNSGetModule is for Mozilla 1.9.2 (Firefox 3.6).
*/
if (XPCOMUtils.generateNSGetFactory) {
	var NSGetFactory = XPCOMUtils.generateNSGetFactory([LocalLoad]);
} else {
	var NSGetModule = XPCOMUtils.generateNSGetModule([LocalLoad]);
}

//Copyright 2010 Brian LePore
