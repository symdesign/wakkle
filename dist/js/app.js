(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wakkl"] = factory();
	else
		root["wakkl"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdatewakkl"];
/******/ 	window["webpackHotUpdatewakkl"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "c9ce8b2313cd04542b83"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/amd-options.js":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ "./src/js/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss__ = __webpack_require__("./src/scss/style.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__("./src/js/components.js");




// alternatively you export wakkl here and initialize it
// in your DOM in the following way:

__WEBPACK_IMPORTED_MODULE_1__components__["a" /* init */]();

/***/ }),

/***/ "./src/js/components.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export settings */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
/* unused harmony export setControl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_collector__ = __webpack_require__("./src/js/components/collector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_controller__ = __webpack_require__("./src/js/components/controller.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_image__ = __webpack_require__("./src/js/components/image.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_mask__ = __webpack_require__("./src/js/components/mask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_sound__ = __webpack_require__("./src/js/components/sound.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_markup__ = __webpack_require__("./src/js/components/markup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_vector__ = __webpack_require__("./src/js/components/vector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_grid__ = __webpack_require__("./src/js/components/grid.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_isElementVisible__ = __webpack_require__("./src/js/utils/isElementVisible.js");













var settings = {
    grid: true
};

var init = function () {

    var collector = new __WEBPACK_IMPORTED_MODULE_0__components_collector__["a" /* Collector */]();
    collector.init();
    collector.ResizeSensor();

    var elements = collector.collect(),
        controller = [],
        components = [],
        image = [],
        mask = [],
        sound = [],
        markup = [],
        vector = [],
        grid = [];

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (Object(__WEBPACK_IMPORTED_MODULE_8__utils_isElementVisible__["a" /* isElementVisible */])(element)) {

            controller[i] = new __WEBPACK_IMPORTED_MODULE_1__components_controller__["a" /* Controller */]();
            controller[i].init();

            image[i] = new __WEBPACK_IMPORTED_MODULE_2__components_image__["a" /* Sequence */](element);
            image[i].init();
            controller[i].control(image[i]);

            mask[i] = new __WEBPACK_IMPORTED_MODULE_3__components_mask__["a" /* Mask */](element);
            mask[i].init();
            controller[i].control(mask[i]);

            sound[i] = new __WEBPACK_IMPORTED_MODULE_4__components_sound__["a" /* Sound */](element);
            !sound[i == 0 ? 0 : i - 1].initialized && sound[i].init();
            controller[i].control(sound[i]);

            markup[i] = new __WEBPACK_IMPORTED_MODULE_5__components_markup__["a" /* Markup */](element);
            markup[i].init();
            controller[i].control(markup[i]);

            vector[i] = new __WEBPACK_IMPORTED_MODULE_6__components_vector__["a" /* Vector */](element);
            vector[i].init();
            controller[i].control(vector[i]);

            if (settings.grid) {
                grid[i] = new __WEBPACK_IMPORTED_MODULE_7__components_grid__["a" /* Grid */](element);
                grid[i].init();
                controller[i].control(grid[i]);
            }

            // TODO: implement global control switch + control switch UI
            // TODO: watch() or listen() if element is in viewport
        }
    }
};

function setControl(mode) {
    for (var i = 0; i < controller.length; i++) {
        controller[i].setActive(mode);
    }
}

function userSettings() {}

/***/ }),

/***/ "./src/js/components/collector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collector_generateUUID__ = __webpack_require__("./src/js/components/collector/generateUUID.js");


__webpack_require__("./src/js/vendor/ResizeSensor.js");

var Collector = function () {

    this.initialized = false;

    var regexp = new RegExp('.*?\.wakkl', 'i');
    var imgs = document.getElementsByTagName('img'),
        img,
        path,
        listener;

    var components = [];

    this.init = function () {

        for (var i = 0; i < imgs.length; i++) {

            img = imgs[i];

            if (!img.hasAttribute('src')) continue;
            if (!regexp.test(img.src)) continue;

            path = img.currentSrc || img.src;
            path = path.replace('.jpg', '');
            path = path.replace('.wakkl', '');
            path = path + '/';

            img.id = img.id || Object(__WEBPACK_IMPORTED_MODULE_0__collector_generateUUID__["a" /* generateUUID */])(); // making sure the img has an ID
            img.markup = img.parentElement.getElementsByTagName('object');

            loadJSON(path + 'meta.json', function (json) {
                img.sound = json.Sound;
                img.mask = json.Mask;
                img.vector = json.Vector;
                img.meta = {
                    "Path": path,
                    "Count": json['Sequence'].Count,
                    "AngleOfView": json['Sequence'].AngleOfView,
                    "Phi": json['Sequence'].Phi,
                    "Chi": json['Sequence'].Chi,
                    "FOV": parseFloat(json['XMP-exif'].FOV),
                    "OriginX": json['Sequence'].OriginX,
                    "OriginY": json['Sequence'].OriginY
                };
            });

            img.wrapper = img.parentElement.nodeName.toLowerCase() == 'wakkl' ? img.parentElement : wrap(img);
            img.wrapper.id = img.id;
            for (var i = 0; i < img.wrapper.children.length; i++) {
                img.wrapper.children[i].style.position = 'absolute';
            }
            Object.assign(img.wrapper.style, {
                'position': getCSSValue('position', img.wrapper) == 'static' ? 'relative' : img.wrapper.position,

                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',

                'display': 'block',
                'width': '100%',
                'height': '0',
                'padding-bottom': img.height / img.width * 100 + '%',

                'perspective': getCSSPerspective(img.meta.FOV, img.width, img.height),
                'perspective-origin': (img.meta.OriginX || '50%') + ' ' + (img.meta.OriginY || '50%')
            });

            components.push(img);
        }

        this.initialized = true;
    };

    this.collect = function () {
        return components;
    };

    this.ResizeSensor = function () {
        new ResizeSensor(element, function () {
            console.log('Changed to ' + element.clientWidth);
        });
    };
};

function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (callback) callback(data);
            }
        }
    };
    xhr.open('GET', path, false); // make synchronous XMLHttpRequest in order receive value outside of the callback function
    xhr.send();
}

function wrap(element) {

    var wrapper = document.createElement('wakkl');
    if (element.hasAttributes()) cloneAttributes(element, wrapper);

    element.parentNode.insertBefore(wrapper, element); // insert wrapper
    wrapper.appendChild(element); // move element into wrapper
    wrapper.removeAttribute('src');
    wrapper.removeAttribute('srcset');

    return wrapper;
}

function cloneAttributes(transmitter, receiver) {
    for (var i = 0; i < transmitter.attributes.length; i++) {
        var attribute = transmitter.attributes[i];
        receiver.setAttribute(attribute.name, attribute.value);
    }
}

function getCSSPerspective(fov, width, height) {
    if (!fov || !width || !height) return 0;
    return Math.pow(width / 2 * width / 2 + height / 2 * height / 2, 0.5) / Math.tan(fov / 2 * Math.PI / 180) + 'px';
}

function getCSSValue(property, element) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

/***/ }),

/***/ "./src/js/components/collector/generateUUID.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateUUID;
function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
}

/***/ }),

/***/ "./src/js/components/controller.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Controller; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_loadScript_js__ = __webpack_require__("./src/js/components/controller/loadScript.js");



const pathToHeadtrackr = 'js/headtrackr.js';

var WIDTH = windowWidth(),
    HEIGHT = windowHeight(),
    getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

// Singleton http://robdodson.me/javascript-design-patterns-singleton/
var Controller = function () {

    this.initialized = false;
    this.q = 0.5;

    var that = this;

    var htracker, videoInput, canvasInput, debugCanvas;

    var active,
        history,
        mouseDownX,
        mouseDownY,
        mousedown,
        mouseMoveX,
        dX = 0,
        easing = 0.05,
        q = 0.5;

    var updater,
        components = [],
        component;

    isMobile() ? set('orientationdrag') : set('mousemove');

    this.init = function () {
        this.initialized = true;
        update();
    };

    this.control = function (obj) {
        components.push(obj);
    };

    function update() {
        // TODO: performance optimisation -> delay in dependence of distance between last and current mouse position 
        // look up: ease to value in certain speed
        // Introduction to Easing in JavaScript https://www.kirupa.com/html5/introduction_to_easing_in_javascript.htm
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            that.q += (q - that.q) * easing;
            component.q = that.q;
            component.update();
        }
    }

    function mouseHandler(e) {
        var mouseX = e.pageX;
        q = mouseX / WIDTH;
        update();
    }

    function dragStart(e) {
        mousedown = 1;
        mouseDownX = e.pageX || e.changedTouches[0].pageX;
        mouseDownY = e.pageY || e.changedTouches[0].pageY;
        document.body.style.cursor = 'grabbing';
    }

    function dragEnd(e) {
        mousedown = 0;
        mouseMoveX = 0;
        document.body.style.cursor = 'grab';
    }

    function dragHandler(e) {

        e.preventDefault();
        if (!mousedown) return;

        var pageX = e.pageX || e.changedTouches[0].pageX,
            pageY = e.pageY || e.changedTouches[0].pageY;

        var _dX = pageX - (mouseMoveX || mouseDownX);

        mouseMoveX = pageX;
        if (dX > 0 && _dX < 0 || dX < 0 && _dX > 0) {
            mouseDownX = mouseMoveX;
        }

        dX = _dX;
        var dQ = dX / WIDTH;
        dQ = -dQ;

        _q = 1 - q;
        _q = _q + dQ;
        _q = _q > 1 ? 1 : _q;
        _q = _q < 0 ? 0 : _q;

        q = 1 - _q;
        update();
    }

    function deviceOrientationHandler(e) {

        if (mousedown) return;

        var orientation, angle;

        switch (window.orientation) {
            case 0:
            case 180:
                orientation = "portrait";
                break;

            case 90:
            case -90:
                orientation = "landscape";
                break;
        }

        angle = orientation == 'portrait' ? e.gamma : e.beta;
        angle = angle > 45 ? 45 : angle;

        q = (angle + 45) * (1 / 90);
        q = q < 0 ? 0 : q;
        q = q > 1 ? 1 : q;
        update();
    }

    function headtrackringStatus(e) {
        if (e.status == "found") {
            console.log('found');
        }
    }

    function headtrackHandler(e) {
        console.log('headtrack event');
        camFov = Math.floor(htracker.getFOV()) / 2;
        q = e.x / camFov + 0.5 - 1;
        q = q * 0.1;
        q = q >= 1 ? 1 : q;
        q = q <= 0 ? 0 : q;
        update();
    }

    function facetrackHandler(e) {
        console.log('facetrack event');
        camFov = Math.floor(htracker.getFOV()) / 2;
        q = e.x / camFov + 0.5 - 1;
        q = q * 0.1;
        q = q >= 1 ? 1 : q;
        q = q <= 0 ? 0 : q;
        update();
    }

    function set(mode) {
        unsetHeadtrackr();
        unsetMousemove();
        unsetMousedrag();
        unsetTouchdrag();
        unsetDeviceorientation();

        active = mode;

        switch (mode) {

            case 'mousemove':
                setMousemove();
                break;

            case 'mousedrag':
                setMousedrag();
                break;

            case 'headtrack' || 'facetrack':
                setHeadtrackr();
                break;

            case 'deviceorientation':
                setDeviceorientation();
                break;

            case 'touchdrag':
                setTouchdrag();
                break;

            case 'orientationdrag':
                setOrientationDrag();
                break;
        }
    }

    function setMousemove() {
        document.addEventListener('mousemove', mouseHandler, false);
    }

    function unsetMousemove() {
        document.removeEventListener('mousemove', mouseHandler, false);
    }

    function setDeviceorientation() {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function unsetDeviceorientation() {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function setMousedrag() {
        document.body.style.cursor = 'grab';
        document.addEventListener('mousedown', dragStart);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragHandler);
    }

    function unsetMousedrag(status) {
        document.body.style.cursor = 'initial';
        document.removeEventListener('mousedown', dragStart);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('mousemove', dragHandler);
    }

    function setTouchdrag() {
        document.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('touchend', dragEnd);
    }

    function unsetTouchdrag() {
        document.removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('touchmove', dragHandler);
    }

    function setOrientationDrag() {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
        document.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('touchend', dragEnd);
    }

    function unsetOrientationDrag() {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false);
        document.removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('touchmove', dragHandler);
    }

    if (getUserMedia) {
        Object(__WEBPACK_IMPORTED_MODULE_0__controller_loadScript_js__["a" /* loadScript */])(pathToHeadtrackr, getHeadtrackr);
    }

    function getHeadtrackr() {

        videoInput = document.createElement('video');
        videoInput.id = 'inputVideo';
        videoInput.autoplay = true;
        videoInput.style.display = 'none';
        document.body.appendChild(videoInput);

        canvasInput = document.createElement('canvas');
        canvasInput.id = 'inputCanvas';
        canvasInput.style.visibility = 'hidden';
        canvasInput.style.position = 'absolute';
        document.body.appendChild(canvasInput);

        debugCanvas = document.createElement('canvas');
        debugCanvas.id = 'debugCanvas';
        debugCanvas.width = 320;
        debugCanvas.height = 240;
        debugCanvas.style.position = 'absolute';
        debugCanvas.style.top = '0';
        debugCanvas.style.left = '0';
        debugCanvas.style.zIndex = '9999';
        debugCanvas.style.display = this.debug ? 'block' : 'none';
        document.body.appendChild(debugCanvas);

        htracker = new headtrackr.Tracker({
            ui: true,
            cameraOffset: 10,
            debug: debugCanvas,
            smoothing: false
        });
    }

    function setHeadtrackr() {

        if (!getUserMedia || !htracker) return;

        htracker.init(videoInput, canvasInput);
        htracker.start();

        getUserMedia = getUserMedia.bind(navigator);
        document.addEventListener('facetrackingEvent', facetrackHandler);
        document.addEventListener('headtrackrrStatus', headtrackringStatus);
    }

    function unsetHeadtrackr() {
        if (!getUserMedia || !htracker) return;

        document.removeEventListener('facetrackingEvent', facetrackHandler);
        htracker.stop();
        htracker.stopStream();
    }

    function isMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    this.setActive = function (mode) {
        set(mode);
        var controlLinks = document.querySelectorAll('.control-link');
        for (var i = 0; i < controlLinks.length; i++) {
            controlLinks[i].classList.remove('active');
        }
        document.getElementById(mode).classList.add('active');
    };

    this.getActive = function () {
        return active;
    };

    this.listAvailable = function () {
        var list = [];

        if (!isMobile()) {
            list = ['mousemove', 'mousedrag'];
            if (getUserMedia) list.push('headtrack');
        }
        if (isMobile()) {
            list = ['orientationdrag'];
        }

        return list;
    };

    this.UI = function (isVisible) {

        var uiId = 'controls';
        var uiClassName = 'controls';

        // make sure UI does not already exist when we draw it
        var ui = document.getElementById(uiId);
        if (document.contains(ui)) {
            ui.remove();
        }

        var isVisible = typeof isVisible == 'undefined' ? true : isVisible;
        if (!isVisible) {
            return;
        } // don't draw UI when it is not visible

        // draw or redraw UI
        var controls = this.listAvailable(),
            ul = document.createElement('ul');
        ul.className = uiClassName;
        ul.id = uiId;

        for (var i = 0; i < controls.length; i++) {

            if (controls.length < 2) break;

            var li = document.createElement('li');
            var a = document.createElement('a');
            a.className = 'control-link icon-' + controls[i];
            a.id = controls[i];
            //a.href = 'javascript: setController(\'' + controls[i] + '\')';
            a.onclick = set(controls[i]);

            var text = document.createTextNode(controls[i]);

            a.appendChild(text);
            li.appendChild(a);
            ul.appendChild(li);
        }

        document.body.appendChild(ul);
        if (controls.length > 1) set(controls[0]);
    };
};

/*
export function setController(controllerName) {
    var controlLinks = document.getElementsByClassName('control-link');
    for (var i = 0; i < controlLinks.length; i++) {
        controlLinks[i].classList.remove('active');
    }
    document.getElementById(controllerName).classList.add('active');
    controller.setActive(controllerName);
}
*/

function windowWidth() {
    return "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
}

function windowHeight() {
    return "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
}
var onresize = function (e) {
    WIDTH = windowWidth(), HEIGHT = windowHeight();
};
window.addEventListener("resize", onresize);

function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + exp : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp));
}

/***/ }),

/***/ "./src/js/components/controller/loadScript.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadScript;
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Check if already embeded
    var scripts = document.getElementsByTagName('script');
    var exists = false;
    var src;
    for (var i = 0; i < scripts.length; i++) {
        src = scripts[i].getAttribute('src');
        if (src != null) {
            if (src.search(url) > -1) {
                exists = true;
            }
        }
    }
    if (!exists) {
        // Fire the loading
        head.appendChild(script);
    }
}

/***/ }),

/***/ "./src/js/components/grid.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grid; });

var Grid = function (element) {

    var that = this,
        listener,
        phi = element.meta.Phi,
        chi = element.meta.Chi;

    this.q = 0.5;

    this.init = function () {

        /*
        element.markup.insert( {
            id:     'xy-grid',
            class:  'grid',
            width:  50,
            height: 50,
            position: {
                x: 20,
                y: -25,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            content: createGrid({
                stroke:         'red',
                strokeWidth:    '1px'
            })
        });
        */
    };

    function createGrid(attr) {

        var stroke = attr.stroke,
            strokeWidth = attr.strokeWidth,
            container = document.createElement('div');

        Object.assign(container.style, {
            'width': '100%',
            'height': '100%',
            'background-size': '10px 10px',
            'background-image': 'linear-gradient(  0deg, ' + stroke + ' ' + strokeWidth + ', transparent ' + strokeWidth + ', transparent ),' + 'linear-gradient( 90deg, ' + stroke + ' ' + strokeWidth + ', transparent ' + strokeWidth + ', transparent )'
        });

        return container;
    }

    this.update = function () {

        /*
        for ( var i = 0; i < element.elements.length; i++ ) {
            element.elements[i].style.backfaceVisibility = 'visible'
            element.elements[i].style.transform = 'rotateY( ' + ( that.q * (chi-phi) + phi ) + 'deg )';
        }
        */

    };
};

/***/ }),

/***/ "./src/js/components/image.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sequence; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_removeFromArray__ = __webpack_require__("./src/js/components/image/removeFromArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_sortArrayMiddleToOut__ = __webpack_require__("./src/js/components/image/sortArrayMiddleToOut.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_imagePreload__ = __webpack_require__("./src/js/components/image/imagePreload.js");





// import isMobile

var Sequence = function (element) {
    // rather call "new Sequence()" as "new Image()" is protected

    this.initialized = false;
    this.q = 0.5;
    this.idx; // absolute image index
    this._idx; // temp absolute image index (easing)

    var that = this,
        image = new Image(),
        q,
        // relative image index
    count,
        // number of loaded image
    listener; // listens for changes of q made by controller

    this.init = function () {

        count = 0;
        image.onload = function () {
            // TODO: test if onload gets fired again inside init-function when currentSrc changes
            loadImages();
        };
        image.src = element.currentSrc || element.src;
    };

    function loadImages() {

        element.style.position = 'absolute';

        var images = Object(__WEBPACK_IMPORTED_MODULE_1__image_sortArrayMiddleToOut__["a" /* sortArrayMiddleToOut */])(getSources()),
            // in order to load progressively starting from the middle
        loaded = [];

        var progress = document.createElement('progress');
        progress.setAttribute('max', images.length);
        progress.setAttribute('value', 0);
        document.body.appendChild(progress); // TODO: add to element.wrapper instead of body

        var appendCount = images.length / 2 % 2 ? Math.round(images.length) : images.length / 2,
            // number of right images
        prependCount = images.length / 2 % 2 ? Math.round(images.length) - 1 : images.length / 2,
            // number of left images
        nextAppend = element.meta.Path + pad(appendCount, element.meta.Count.toString().length) + '.jpg',
            nextPrepend = element.meta.Path + pad(prependCount, element.meta.Count.toString().length) + '.jpg';

        new __WEBPACK_IMPORTED_MODULE_2__image_imagePreload__["a" /* imagePreload */](images, {
            onProgress: function (image, imageEl, index) {
                var percent = Math.floor(100 / this.queue.length * this.completed.length);
                progress.value = index;

                if (count > 0 && element) element.remove();
                if (count > 3 && !listener) listen();

                loaded.push(image);

                for (var i = 0; i < loaded.length; i++) {
                    // to keep the loaded as short as possible
                    if (loaded.indexOf(nextAppend) >= 0) {
                        Object(__WEBPACK_IMPORTED_MODULE_0__image_removeFromArray__["a" /* removeFromArray */])(loaded, nextAppend);
                        appendImage(nextAppend, element.wrapper);
                        appendCount++;
                        // next image
                        nextAppend = element.meta.Path + pad(appendCount, element.meta.Count.toString().length) + '.jpg';
                    }
                    if (loaded.indexOf(nextPrepend) >= 0) {
                        Object(__WEBPACK_IMPORTED_MODULE_0__image_removeFromArray__["a" /* removeFromArray */])(loaded, nextPrepend);
                        prependImage(nextPrepend, element.wrapper);
                        prependCount--;
                        // next image
                        nextPrepend = element.meta.Path + pad(prependCount, element.meta.Count.toString().length) + '.jpg';
                    }
                }
            },
            onComplete: function (loaded, errors) {
                progress.style.display = 'none';
                this.initialized = true;
            }
        });
    }

    function createImage(source) {
        var objectFit = window.getComputedStyle(element, null).getPropertyValue('object-fit');
        var image = document.createElement('img');
        image.src = source;
        image.style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image.style.opacity = 0;
        image.style.position = 'absolute'; // stack images on z axis
        if (objectFit != 'fill' && objectFit != 'none') {
            image.style.objectFit = objectFit;
            image.style.width = (element.hasAttribute('width') ? element.width : element.style.width) || '100%';
            image.style.height = (element.hasAttribute('height') ? element.height : element.style.height) || 'auto';
        }
        return image;
    }

    function appendImage(source, wrapper) {
        var image = createImage(source);
        wrapper.appendChild(image);
        count++;
    }

    function prependImage(source, wrapper) {
        var image = createImage(source);
        wrapper.insertBefore(image, wrapper.firstChild);
        count++;
    }

    function getSources() {
        var array = [];
        for (var i = 0; i < element.meta.Count; i++) {
            array[i] = element.meta.Path + pad(i, element.meta.Count.toString().length) + '.jpg';
        }
        return array;
    }

    this.update = function () {
        that._idx = that._idx || 0;
        that.idx = Math.round((count - 1) * that.q);

        var image = document.getElementById(element.id).getElementsByTagName('img');

        if (!that.initialized) {
            for (var i = 0; i < image.length; i++) {
                image[i].style.filter = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity = 0;

        image[that.idx].style.filter = "alpha(opacity = 1)"; // Internet Explorer
        image[that.idx].style.opacity = 1;

        that._idx = that.idx;
    };

    function listen() {

        that._idx = that._idx || 0;
        that.idx = Math.round((count - 1) * that.q);

        var image = document.getElementById(element.id).getElementsByTagName('img');

        if (!that.initialized) {
            for (var i = 0; i < image.length; i++) {
                image[i].style.filter = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity = 0;

        image[that.idx].style.filter = "alpha(opacity = 1)"; // Internet Explorer
        image[that.idx].style.opacity = 1;

        that._idx = that.idx;

        //listener = window.requestAnimationFrame(listen)
    }
};

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function pad(num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

function isMobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

/***/ }),

/***/ "./src/js/components/image/imagePreload.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imagePreload; });
// http://fragged.org/preloading-images-using-javascript-the-right-way-and-without-frameworks_744.html
//(function() {


var imagePreload = function (images, options) {
    this.options = {
        pipeline: false,
        auto: true,
        /* onProgress: function(){}, */
        /* onError: function(){}, */
        onComplete: function () {}
    };

    options && typeof options == 'object' && this.setOptions(options);

    this.addQueue(images);
    this.queue.length && this.options.auto && this.processQueue();
};

imagePreload.prototype.setOptions = function (options) {
    // shallow copy
    var o = this.options,
        key;

    for (key in options) options.hasOwnProperty(key) && (o[key] = options[key]);

    return this;
};

imagePreload.prototype.addQueue = function (images) {
    // stores a local array, dereferenced from original
    this.queue = images.slice();

    return this;
};

imagePreload.prototype.reset = function () {
    // reset the arrays
    this.completed = [];
    this.errors = [];

    return this;
};

imagePreload.prototype.load = function (src, index) {
    var image = new Image(),
        self = this,
        o = this.options;

    // set some event handlers
    image.onerror = image.onabort = function () {
        this.onerror = this.onabort = this.onload = null;

        self.errors.push(src);
        o.onError && o.onError.call(self, src);
        checkProgress.call(self, src);
        o.pipeline && self.loadNext(index);
    };

    image.onload = function () {
        this.onerror = this.onabort = this.onload = null;

        // store progress. this === image
        self.completed.push(src); // this.src may differ
        checkProgress.call(self, src, this);
        o.pipeline && self.loadNext(index);
    };

    // actually load
    image.src = src;

    return this;
};

imagePreload.prototype.loadNext = function (index) {
    // when pipeline loading is enabled, calls next item
    index++;
    this.queue[index] && this.load(this.queue[index], index);

    return this;
};

imagePreload.prototype.processQueue = function () {
    // runs through all queued items.
    var i = 0,
        queue = this.queue,
        len = queue.length;

    // process all queue items
    this.reset();

    if (!this.options.pipeline) for (; i < len; ++i) this.load(queue[i], i);else this.load(queue[0], 0);

    return this;
};

function checkProgress(src, image) {
    // intermediate checker for queue remaining. not exported.
    // called on imagePreload instance as scope
    var args = [],
        o = this.options;

    // call onProgress
    o.onProgress && src && o.onProgress.call(this, src, image, this.completed.length);

    if (this.completed.length + this.errors.length === this.queue.length) {
        args.push(this.completed);
        this.errors.length && args.push(this.errors);
        o.onComplete.apply(this, args);
    }

    return this;
}

if (typeof define === 'function' && __webpack_require__("./node_modules/webpack/buildin/amd-options.js")) {
    // we have an AMD loader.
    define(function () {
        return imagePreload;
    });
} else {
    this.imagePreload = imagePreload;
}
//}).call(this);

/***/ }),

/***/ "./src/js/components/image/removeFromArray.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = removeFromArray;
function removeFromArray(arr) {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

/***/ }),

/***/ "./src/js/components/image/sortArrayMiddleToOut.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sortArrayMiddleToOut;
function sortArrayMiddleToOut(array) {
    var startIndex = Math.ceil(array.length / 2),
        newArray = [],
        i = startIndex,
        j = i + 1;
    while (j < array.length || i >= 0) {
        if (i >= 0) newArray.push(array[i]);
        if (j < array.length) newArray.push(array[j]);
        i--;
        j++;
    };
    return newArray;
}

/***/ }),

/***/ "./src/js/components/markup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Markup; });

var Markup = function (element) {

    this.initialized = false;
    this.q = 0.5;

    var that = this,
        listener,
        phi = element.meta.Phi,
        chi = element.meta.Chi;

    var objects = element.markup;

    this.init = function () {

        if (!element.markup) return;

        for (var i = 0; i < objects.length; i++) {

            var object = objects[i];
            convertAttributes(object);
        }

        this.initialized = true;
    };

    this.update = function () {

        for (var i = 0; i < objects.length; i++) {

            var object = objects[i];
            object.style.transform = 'rotateY( ' + (that.q * (chi - phi) + phi) + 'deg )';
        }
    };

    this.insert = function (attr) {

        var object = document.createElement('object'); // = where the controller is applied to
        var childNode = document.createElement('div'); // = where attributes are assigned to 

        childNode.id = attr.id;
        childNode.class = attr.className;

        childNode.x = attr.position.x;
        childNode.y = attr.position.y;
        childNode.z = attr.position.z;

        childNode['rotation-x'] = attr.rotation.x;
        childNode['rotation-y'] = attr.rotation.y;
        childNode['rotation-z'] = attr.rotation.z;

        childNode.width = attr.width;
        childNode.height = attr.height;

        object.appendChild(childNode);

        convertAttributes(object);

        // Add object to DOM
        element.wrapper.appendChild(object);

        // Add object to list
        element.markup.push(object);
    };

    function convertAttributes(object) {

        for (var j = 0; j < object.children.length; j++) {

            var childNode = object.children[j];

            var placement = document.createElement('div'),
                // = where the transformation attributes are applied to
            size = childNode; // = where the size attribute is applied to

            // Parse attributes
            var id = childNode.id || '',
                className = childNode.class || '',
                position = {
                x: childNode.x || 0,
                y: childNode.y || 0,
                z: childNode.z || 0
            },
                rotation = {
                x: childNode['rotation-x'] || 0,
                y: childNode['rotation-y'] || 0,
                z: childNode['rotation-z'] || 0
            },
                width = childNode.width || 'auto',
                height = childNode.height || 'auto';

            // Translate attributes to CSS
            object.id = id;
            object.className = className;

            placement.style.transform = ' translateX(' + position.x + '%)' + ' translateY(' + position.y + '%)' + ' translateZ(' + position.z / 100 * element.width + 'px)' + ' rotateX(' + rotation.x + 'deg)' + ' rotateY(' + rotation.y + 'deg)' + ' rotateZ(' + rotation.z + 'deg)';
            size.style.width = width;
            size.style.height = height;

            object.appendChild(placement);
            placement.appendChild(size);

            Object.assign(object.style, {
                'position': 'absolute',
                'width': '100%',
                'height': '100%',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'transform-style': 'preserve-3d'
            });
            Object.assign(placement.style, {
                'position': 'absolute',
                'width': '50%',
                'height': 50 * element.width / element.height + '%',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            });
            Object.assign(size.style, {
                'position': 'absolute'
            });
        }
    }
};

/***/ }),

/***/ "./src/js/components/mask.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mask; });

var Mask = function () {
    this.q = 0.5;
    this.init = function () {};
    this.update = function () {};
};

/***/ }),

/***/ "./src/js/components/sound.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sound; });

var Sound = function (element) {

    this.initialized = false;
    this.q = 0.5;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var that = this,
        audio = new Audio(),
        context = new AudioContext(),
        panner = context.createPanner(),
        level,
        volume,
        up,
        down,
        speed = 0.01,
        listener;

    this.init = function () {

        if (!element.sound) return;

        audio.src = element.meta.Path + element.sound.Source;
        audio.autoplay = element.sound.Autoplay || false;
        audio.loop = element.sound.Loop || true;
        audio.volume = 0; // let's make a nice fade-in instead
        audio.controls = false;

        panner.setPosition(0, 0, 1);
        panner.panningModel = 'equalpower';
        panner.connect(context.destination);

        context.listener.setPosition(0, 0, 0);
        context.createMediaElementSource(audio).connect(panner);

        this.initialized = true;
        this.start();
    };

    this.start = function () {
        play();
    };
    this.stop = function () {
        pause();
    };

    this.update = function () {
        var x = -1 * (that.q - 0.5) * 2,
            y = 0,
            z = 1 - Math.abs(x);

        panner.setPosition(x, y, z);
    };

    function play() {
        volume = 1;

        audio.play();
        level = audio.volume + speed >= volume ? volume : audio.volume + speed;
        audio.volume = level;

        if (audio.volume == volume) {
            cancelAnimationFrame(up);
            up = undefined;
        } else {
            if (down) cancelAnimationFrame(down);
            up = requestAnimationFrame(play);
        }
    }

    function pause() {
        volume = 0;

        audio.play();
        level = audio.volume - speed <= volume ? volume : audio.volume - speed;
        audio.volume = level;

        if (audio.volume == volume) {
            cancelAnimationFrame(down);
            down = undefined;
        } else {
            if (up) cancelAnimationFrame(up);
            down = requestAnimationFrame(pause);
        }
    }

    function stop() {
        pause();
        audio.currentTime = 0;
    }
};

/***/ }),

/***/ "./src/js/components/vector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector; });

var Vector = function () {
    this.q = 0.5;
    this.init = function () {};
    this.update = function () {};
};

/***/ }),

/***/ "./src/js/utils/isElementVisible.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isElementVisible;
function isElementVisible(el) {
    var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        efp = function (x, y) {
        return document.elementFromPoint(x, y);
    };

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;

    // Return true if any of its four corners are visible
    return el.contains(efp(rect.left, rect.top)) || el.contains(efp(rect.right, rect.top)) || el.contains(efp(rect.right, rect.bottom)) || el.contains(efp(rect.left, rect.bottom));
}

/***/ }),

/***/ "./src/js/vendor/ResizeSensor.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */

(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ResizeSensor = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
        return window.setTimeout(fn, 20);
    };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback) {
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = '[object Array]' === elementsType || '[object NodeList]' === elementsType || '[object HTMLCollection]' === elementsType || '[object Object]' === elementsType || 'undefined' !== typeof jQuery && elements instanceof jQuery //jquery
        || 'undefined' !== typeof Elements && elements instanceof Elements //mootools
        ;
        var i = 0,
            j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
    * Get element size
    * @param {HTMLElement} element
    * @returns {Object} {width, height}
    */
    function getElementSize(element) {
        if (!element.getBoundingClientRect) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            };
        }

        var rect = element.getBoundingClientRect();
        return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        };
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function (element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function (ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function () {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call();
                }
            };

            this.remove = function (ev) {
                var newQueue = [];
                for (i = 0, j = q.length; i < j; i++) {
                    if (q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function () {
                return q.length;
            };
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element) return;
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.dir = 'ltr';
            element.resizeSensor.className = 'resize-sensor';
            var style = 'position: absolute; left: -10px; top: -10px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
            var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

            element.resizeSensor.style.cssText = style;
            element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '">' + '<div style="' + styleChild + '"></div>' + '</div>' + '<div class="resize-sensor-shrink" style="' + style + '">' + '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' + '</div>';
            element.appendChild(element.resizeSensor);

            var position = window.getComputedStyle(element).getPropertyValue('position');
            if ('absolute' !== position && 'relative' !== position && 'fixed' !== position) {
                element.style.position = 'relative';
            }

            var expand = element.resizeSensor.childNodes[0];
            var expandChild = expand.childNodes[0];
            var shrink = element.resizeSensor.childNodes[1];
            var dirty, rafId, newWidth, newHeight;
            var size = getElementSize(element);
            var lastWidth = size.width;
            var lastHeight = size.height;

            var reset = function () {
                //set display to block, necessary otherwise hidden elements won't ever work
                var invisible = element.offsetWidth === 0 && element.offsetHeight === 0;

                if (invisible) {
                    var saveDisplay = element.style.display;
                    element.style.display = 'block';
                }

                expandChild.style.width = '100000px';
                expandChild.style.height = '100000px';

                expand.scrollLeft = 100000;
                expand.scrollTop = 100000;

                shrink.scrollLeft = 100000;
                shrink.scrollTop = 100000;

                if (invisible) {
                    element.style.display = saveDisplay;
                }
            };
            element.resizeSensor.resetSensor = reset;

            var onResized = function () {
                rafId = 0;

                if (!dirty) return;

                lastWidth = newWidth;
                lastHeight = newHeight;

                if (element.resizedAttached) {
                    element.resizedAttached.call();
                }
            };

            var onScroll = function () {
                var size = getElementSize(element);
                var newWidth = size.width;
                var newHeight = size.height;
                dirty = newWidth != lastWidth || newHeight != lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function (el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);

            // Fix for custom Elements
            requestAnimationFrame(reset);
        }

        forEachElement(element, function (elem) {
            attachResizeEvent(elem, callback);
        });

        this.detach = function (ev) {
            ResizeSensor.detach(element, ev);
        };

        this.reset = function () {
            element.resizeSensor.resetSensor();
        };
    };

    ResizeSensor.reset = function (element, ev) {
        forEachElement(element, function (elem) {
            elem.resizeSensor.resetSensor();
        });
    };

    ResizeSensor.detach = function (element, ev) {
        forEachElement(element, function (elem) {
            if (!elem) return;
            if (elem.resizedAttached && typeof ev === "function") {
                elem.resizedAttached.remove(ev);
                if (elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    return ResizeSensor;
});

/***/ }),

/***/ "./src/scss/style.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
});