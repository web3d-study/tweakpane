const FolderViewInterface   = require('./foloder_view_interface');
const PropertyViewInterface = require('./property_view_interface');

class CoreInterface {
	constructor(core) {
		this.core_ = core;
	}

	getElement() {
		return this.core_.getRootView().getElement();
	}

	add(target, propName, opt_options) {
		const propView = this.core_.addProperty(
			target, propName, false, opt_options
		);
		return new PropertyViewInterface(propView);
	}

	monitor(target, propName, opt_options) {
		const propView = this.core_.addProperty(
			target, propName, true, opt_options
		);


		return new PropertyViewInterface(propView);
	}

	addFolder(title) {
		const folderView = this.core_.addFolder(title);
		return new FolderViewInterface(folderView);
	}

	getJson() {
		return this.core_.getJson();
	}

	setJson(json) {
		return this.core_.setJson(json);
	}

	on(eventName, handler, opt_scope) {
		const emitter = this.core_.getEmitter();
		emitter.on(eventName, handler, opt_scope);
	}

	off(eventName, handler, opt_scope) {
		const emitter = this.core_.getEmitter();
		emitter.off(eventName, handler, opt_scope);
	}
}

module.exports  = CoreInterface;