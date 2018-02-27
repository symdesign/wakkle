var wakkle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdatewakkle"];
/******/ 	window["webpackHotUpdatewakkle"] = 
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
/******/ 	var hotCurrentHash = "b09d955db843b05aca54"; // eslint-disable-line no-unused-vars
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

/***/ "./node_modules/document-register-element/build/document-register-element.js":
/***/ (function(module, exports) {

/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/simple-element-resize-detector/dist/simple-element-resize-detector.js":
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):e.simpleElementResizeDetector=n()}(this,function(){var e="position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;",n=function(n,t){var i=document.createElement("iframe");return i.style.cssText=e,n.appendChild(i),i.contentWindow.onresize=function(){t(n)},i};return n});
//# sourceMappingURL=simple-element-resize-detector.js.map

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("./node_modules/setimmediate/setImmediate.js");
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss__ = __webpack_require__("./src/scss/style.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_document_register_element__ = __webpack_require__("./node_modules/document-register-element/build/document-register-element.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_document_register_element___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_document_register_element__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_collector__ = __webpack_require__("./src/js/components/collector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_controller__ = __webpack_require__("./src/js/components/controller.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_image__ = __webpack_require__("./src/js/components/image.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_mask__ = __webpack_require__("./src/js/components/mask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_sound__ = __webpack_require__("./src/js/components/sound.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_markup__ = __webpack_require__("./src/js/components/markup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_vector__ = __webpack_require__("./src/js/components/vector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_grid__ = __webpack_require__("./src/js/components/grid.js");














//import {isElementVisible}   from './utils/isElementVisible';

var version = '1.0';

var init = function (settings) {

    if (!settings) settings = {};

    if (settings.ui === undefined) settings.ui = true;

    if (settings.grid === undefined) settings.grid = {};
    if (settings.grid.xy === undefined && settings.grid === undefined) settings.grid.xy = false;
    if (settings.grid.yz === undefined && settings.grid === undefined) settings.grid.yz = false;
    if (settings.grid.xz === undefined && settings.grid === undefined) settings.grid.xz = false;

    if (typeof settings.grid === 'boolean') {
        var status = settings.grid;
        settings.grid = {};
        settings.grid.xy = settings.grid.yz = settings.grid.xz = status;
    }

    var grid = new __WEBPACK_IMPORTED_MODULE_9__components_grid__["a" /* Grid */]({
        xy: settings.grid.xy,
        yz: settings.grid.yz,
        xz: settings.grid.xz
    });

    var collector = new __WEBPACK_IMPORTED_MODULE_2__components_collector__["a" /* Collector */]();
    collector.init();
    collector.ResizeSensor();

    var elements = collector.collect(),
        controller = [],
        components = [],
        image = [],
        mask = [],
        sound = [],
        markup = [],
        vector = [];

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        //if ( !isElementVisible( element ) ) { // Needs to be fixed

        controller[i] = new __WEBPACK_IMPORTED_MODULE_3__components_controller__["a" /* Controller */](element);
        controller[i].UI = settings.ui;
        controller[i].init();

        image[i] = new __WEBPACK_IMPORTED_MODULE_4__components_image__["a" /* Sequence */](element);
        image[i].init();
        controller[i].control(image[i]);

        mask[i] = new __WEBPACK_IMPORTED_MODULE_5__components_mask__["a" /* Mask */](element);
        mask[i].init();
        controller[i].control(mask[i]);

        sound[i] = new __WEBPACK_IMPORTED_MODULE_6__components_sound__["a" /* Sound */](element);
        !sound[i == 0 ? 0 : i - 1].initialized && sound[i].init();
        controller[i].control(sound[i]);

        markup[i] = new __WEBPACK_IMPORTED_MODULE_7__components_markup__["a" /* Markup */](element);
        markup[i].init();
        if (settings.grid.xy) markup[i].insert(grid.xy);
        if (settings.grid.yz) markup[i].insert(grid.yz);
        if (settings.grid.xz) markup[i].insert(grid.xz);
        controller[i].control(markup[i]);

        vector[i] = new __WEBPACK_IMPORTED_MODULE_8__components_vector__["a" /* Vector */](element);
        vector[i].init();
        controller[i].control(vector[i]);

        // TODO: implement global control switch + control switch UI
        // TODO: watch() or listen() if element is in viewport

        //}
    }
};

/***/ }),

/***/ "./src/js/components/collector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collector_generateUUID__ = __webpack_require__("./src/js/components/collector/generateUUID.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_timers__ = __webpack_require__("./node_modules/timers-browserify/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_timers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_timers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_element_resize_detector__ = __webpack_require__("./node_modules/simple-element-resize-detector/dist/simple-element-resize-detector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_element_resize_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_simple_element_resize_detector__);




// var elementResizeDetectorMaker = require("element-resize-detector");
// var ResizeDetector = elementResizeDetectorMaker();



const WAKKLE_FILE_EXTENSION = 'wakkle';
const WAKKLE_TAGNAME = 'wakkle-image';

var Collector = function () {

    this.initialized = false;

    var regexp = new RegExp('.*?\.' + WAKKLE_FILE_EXTENSION, 'i');
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
            path = path.replace('.wakkle', '');
            path = path + '/';

            img.id = img.id || Object(__WEBPACK_IMPORTED_MODULE_0__collector_generateUUID__["a" /* generateUUID */])(); // making sure the img has an ID
            img.markup = img.parentElement.getElementsByTagName('object');

            loadJSON(path + 'meta.json', function (json) {
                img.sound = json.Sound;
                img.mask = json.Mask;
                img.vector = json.Vector;
                img.meta = {
                    "Path": path,
                    "Count": json['WAKKLE-dataset'].Count,
                    "AngleOfView": json['WAKKLE-dataset'].AngleOfView,
                    "Phi": json['WAKKLE-dataset'].Phi,
                    "Chi": json['WAKKLE-dataset'].Chi,
                    "FOV": parseFloat(json['XMP-exif'].FOV),
                    "OriginX": json['WAKKLE-dataset'].OriginX,
                    "OriginY": json['WAKKLE-dataset'].OriginY
                };
            });

            document.registerElement(WAKKLE_TAGNAME);
            img.wrapper = img.parentElement.nodeName.toLowerCase() == WAKKLE_TAGNAME ? img.parentElement : wrap(img);
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
                'padding-bottom': img.naturalHeight / img.naturalWidth * 100 + '%',

                'overflow': 'hidden',

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

        var elements = document.getElementsByTagName(WAKKLE_TAGNAME);

        for (var i = 0; i < elements.length; i++) {

            __WEBPACK_IMPORTED_MODULE_2_simple_element_resize_detector___default()(elements[i], element => {
                var width = element.children[0].offsetWidth,
                    height = element.children[0].offsetHeight;

                element.style.perspective = getCSSPerspective(img.meta.FOV, width, height);
            });

            // ResizeDetector.listenTo( elements[i], function( element ) {

            //     var width = element.children[0].offsetWidth,
            //         height = element.children[0].offsetHeight;

            //     element.style.perspective = getCSSPerspective( img.meta.FOV, width, height );

            // });
        }
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

    var wrapper = document.createElement(WAKKLE_TAGNAME);
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



const CONTROL_ICONS = {
    html: __webpack_require__("./src/js/components/controller/control-icons.svg"),
    fill: '#fff',
    size: '32'
};

const HEAD_MOVE = {
    name: 'head_move',
    icon: {
        selector: '#icon-head-move'
    },
    lib: 'js/headtrackr.min.js'
};

const MOUSE_MOVE = {
    name: 'mouse_move',
    icon: {
        selector: '#icon-mouse-move'
    }
};

const MOUSE_DRAG = {
    name: 'mouse_drag',
    icon: {
        selector: '#icon-mouse-drag'
    }
};

const TOUCH_DRAG = {
    name: 'touch_drag',
    icon: {
        selector: '#icon-touch-drag'
    }
};

const DEVICE_ORIENTATION = {
    name: 'device_orientation',
    icon: {
        selector: '#icon-device-orientation'
    }
};

var WIDTH = windowWidth(),
    HEIGHT = windowHeight();

var Controller = function (element) {

    this.initialized = false;
    this.q = 0.5;

    this.UI = false;
    var trackers = [];

    var that = this;

    var htracker, videoInput, canvasInput, debugCanvas, camFov;

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

    this.init = function () {

        if (this.UI && hasWebcam()) {
            trackers.push(HEAD_MOVE);
        }
        if (this.UI && hasMouse()) {
            trackers.push(MOUSE_MOVE);
            trackers.push(MOUSE_DRAG);
        }
        if (this.UI && hasTouch()) {
            trackers.push(TOUCH_DRAG);
        }
        if (this.UI && hasDeviceOrientation()) {
            trackers.push(DEVICE_ORIENTATION);
        }

        drawControllers();
        update();

        if (hasMouse()) this.setActive('mouse_move');
        if (hasDeviceOrientation()) this.setActive('device_orientation');

        this.initialized = true;
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

        q = 1 - q;
        q = q + dQ;
        q = q > 1 ? 1 : q;
        q = q < 0 ? 0 : q;
        q = 1 - q;

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

    var headtrackingDialogVisibility;

    function headtrackingStatus(e) {
        if (e.status == "found") {
            removeHeadtrackingDialog();
        }
    }

    function removeHeadtrackingDialog() {
        var headtrackingDialog = document.querySelector('.dialog-container');
        if (headtrackingDialog.style.opacity == '0') {
            setTimeout(() => {
                headtrackingDialog.remove();
            }, 300); // wait for fadeOut and remove
            cancelAnimationFrame(headtrackingDialogVisibility);
        } else {
            headtrackingDialogVisibility = requestAnimationFrame(removeHeadtrackingDialog);
        }
    }

    function head_moveHandler(e) {
        console.log('head_move event');
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

        switch (mode) {

            case 'mouse_move':
                setMousemove();
                break;

            case 'mouse_drag':
                setMousedrag();
                break;

            case 'head_move':
                setHeadtrackr();
                break;

            case 'device_orientation':
                setDeviceorientation();
                break;

            case 'touch_drag':
                setTouchdrag();
                break;

            case 'device_orientation_drag':
                setDeviceOrientationDrag();
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
        window.addEventListener('device_orientation', deviceOrientationHandler, false);
    }

    function unsetDeviceorientation() {
        window.removeEventListener('device_orientation', deviceOrientationHandler, false);
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

    function setDeviceOrientationDrag() {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
        document.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('touchend', dragEnd);
    }

    function unsetDeviceOrientationDrag() {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false);
        document.removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('touchmove', dragHandler);
    }

    if (hasWebcam()) {
        Object(__WEBPACK_IMPORTED_MODULE_0__controller_loadScript_js__["a" /* loadScript */])(HEAD_MOVE.lib, initHeadtrackr);
    }

    function initHeadtrackr() {

        videoInput = document.createElement('video');
        videoInput.id = 'inputVideo';
        videoInput.autoplay = true;
        videoInput.style.display = 'none';
        element.wrapper.appendChild(videoInput);

        canvasInput = document.createElement('canvas');
        canvasInput.id = 'inputCanvas';
        canvasInput.style.visibility = 'hidden';
        canvasInput.style.position = 'absolute';
        element.wrapper.appendChild(canvasInput);

        debugCanvas = document.createElement('canvas');
        debugCanvas.id = 'debugCanvas';
        debugCanvas.width = 320;
        debugCanvas.height = 240;
        debugCanvas.style.position = 'absolute';
        debugCanvas.style.zIndex = '9';
        debugCanvas.style.display = this.debug ? 'block' : 'none';
        debugCanvas.style.transform = 'scaleX(-1)';
        element.wrapper.appendChild(debugCanvas);

        htracker = new headtrackr.Tracker({
            ui: true,
            cameraOffset: 10,
            debug: debugCanvas,
            smoothing: false
        });
    }

    function setHeadtrackr() {

        if (!hasWebcam() || !htracker) return;

        htracker.init(videoInput, canvasInput);
        htracker.start();

        var getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        getUserMedia = getUserMedia.bind(navigator);
        document.addEventListener('facetrackingEvent', facetrackHandler);
        document.addEventListener('headtrackrStatus', headtrackingStatus);
    }

    function unsetHeadtrackr() {
        if (!hasWebcam() || !htracker) return;
        console.log('unset Headtrackr');
        document.removeEventListener('facetrackingEvent', facetrackHandler);
        htracker.stop();
        htracker.stopStream();
    }

    this.setActive = function (tracker) {

        set(tracker);

        if (!this.UI) return;

        var controlLinks = element.wrapper.querySelectorAll('.control-button');

        controlLinks.forEach((item, index) => {
            item.classList.remove('active');

            var icon = item.querySelector('use');
            var href = icon.getAttribute('xlink:href').replace('-off', '');

            icon.setAttribute('xlink:href', href + '-off');
        });

        var item = element.wrapper.querySelector('[data-tracker=' + tracker + ']');
        var icon = item.querySelector('use');
        var href = icon.getAttribute('xlink:href').replace('-off', '');

        item.classList.add('active');
        icon.setAttribute('xlink:href', href);
    };

    this.getActive = function () {
        return active;
    };

    function drawControllers() {

        var icons = document.createElement('div');
        icons.style.display = 'none';
        icons.innerHTML = CONTROL_ICONS.html;

        element.wrapper.appendChild(icons);

        var ul = document.createElement('ul'),
            li,
            tracker;

        for (var i = 0; i < trackers.length; i++) {

            tracker = trackers[i];

            li = document.createElement('li');
            li.className = 'control-button ' + tracker.name;
            li.innerHTML = '<svg ' + 'width="' + CONTROL_ICONS.size + '" ' + 'height="' + CONTROL_ICONS.size + '" ' + '>' + '<use ' + 'xlink:href="' + tracker.icon.selector + '-off" ' + 'fill="' + CONTROL_ICONS.fill + '" ' + '/>' + '</svg>';
            li.style.width = '2em';
            li.style.height = '2em';
            li.style.cursor = 'pointer';
            li.dataset.tracker = tracker.name;

            li.addEventListener('click', function (e) {
                that.setActive(this.dataset.tracker);
            }, false);

            ul.className = 'control-buttons';
            ul.appendChild(li);
        }

        ul.style.position = 'absolute';
        ul.style.zIndex = '999'; // looks bad but I really don't know how many items there will be
        document.getElementById(element.id).appendChild(ul);
    }

    function isMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    function hasWebcam() {
        return navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    }
    function hasTouch() {
        try {
            document.createEvent('TouchEvent');
            return true;
        } catch (e) {
            return false;
        }
    }
    function hasMouse() {
        try {
            document.createEvent('MouseEvent');
            return true;
        } catch (e) {
            return false;
        }
    }
    function hasDeviceOrientation() {
        try {
            document.createEvent('DeviceOrientationEvent');
            document.createEvent('TouchEvent'); // Macbook Pro fires a not real DeviceOrientationEvent
            return true;
        } catch (e) {
            return false;
        }
    }
};

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

/***/ "./src/js/components/controller/control-icons.svg":
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none;\"><symbol id=\"icon-head-move\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M97.8184019,84.5518468 C99.7627119,85.6864569 100.911622,87.8683995 101,90.1376197 L101,96.6834473 C101,98.5162791 99.4975787,100 97.6416465,100 L31.3583535,100 C29.5024213,100 28,98.5162791 28,96.6834473 L28,90.1376197 C28,87.8683995 29.1489104,85.6864569 31.0932203,84.5518468 C34.4515738,82.5444596 40.2845036,79.4024624 47.1779661,77.0459644 C52.4806295,85.5119015 60.2578692,86.821067 64.5883777,86.821067 C68.8305085,86.821067 76.6077482,85.5119015 81.9987893,77.1332421 C88.7154964,79.4897401 94.4600484,82.5444596 97.8184019,84.5518468 Z M64.5883777,34 C73.779661,34 81.2033898,41.5931601 81.2033898,50.9318741 C81.2033898,60.2705882 79.6125908,79.8207934 64.5883777,79.8207934 C49.5641646,79.8207934 47.9733656,60.3578659 47.9733656,50.9318741 C47.9733656,41.5931601 55.3970944,34 64.5883777,34 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-head-move-off\" viewBox=\"0 0 128 128\"><path d=\"M48.0321681,54.0117193 C48.0315053,53.9946954 48.0308489,53.9776881 48.030199,53.9606976 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L49.0075598,45.0385634 C51.3539626,38.598022 57.4360007,34 64.5883777,34 C73.779661,34 81.2033898,41.5931601 81.2033898,50.9318741 C81.2033898,56.6476481 80.6074653,66.1887185 76.7003557,72.7313593 L81.6417849,77.6727885 C81.7618826,77.4962848 81.8809065,77.3164536 81.9987893,77.1332421 C88.7154964,79.4897401 94.4600484,82.5444596 97.8184019,84.5518468 C99.7627119,85.6864569 100.911622,87.8683995 101,90.1376197 L101,96.6834473 C101,96.7951854 100.994416,96.9056259 100.983508,97.0145118 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L94.0695015,100 L94.0223633,100 L76.8226322,82.8009867 C76.8317105,82.7941229 76.8407881,82.7872485 76.8498643,82.7803628 L71.9009856,77.8314841 C71.8911561,77.8376779 71.8813164,77.8438591 71.8714666,77.8500276 L48.0321683,54.0117241 Z M49.5627717,65.4417134 L63.9297438,79.808086 C55.4720557,79.4785757 51.445917,72.7895263 49.5627717,65.4417134 Z M70.1876221,86.0657032 L84.1225004,100 L31.3583535,100 C29.5024213,100 28,98.5162791 28,96.6834473 L28,90.1376197 C28,87.8683995 29.1489104,85.6864569 31.0932203,84.5518468 C34.4515738,82.5444596 40.2845036,79.4024624 47.1779661,77.0459644 C52.4806295,85.5119015 60.2578692,86.821067 64.5883777,86.821067 C66.0966298,86.821067 68.0517532,86.6555761 70.1876221,86.0657032 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-touch-drag\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M69.9621104,41 C69.9872171,40.6699584 70,40.336472 70,40 C70,32.8202983 64.1797017,27 57,27 C49.8202983,27 44,32.8202983 44,40 C44,40.336472 44.0127829,40.6699584 44.0378896,41 L44,41 L44,56.4935277 C39.1274959,52.6478094 36,46.6891376 36,40 C36,28.4020203 45.4020203,19 57,19 C68.5979797,19 78,28.4020203 78,40 C78,46.6891376 74.8725041,52.6478094 70,56.4935277 L70,41 L69.9621104,41 Z M67.4731547,59.838568 C72.4657245,59.838568 81.3112267,63.9016571 84.0522381,65.1740497 C86.7932495,66.4464422 88.4693079,67.7651397 89.3061282,70.7492444 C90.1641333,73.8087525 90.2181704,76.9246778 89.5140005,81.4868684 C88.8397289,85.8552662 87.5399773,90.3324995 85.8345008,94.1628423 C84.0411418,98.1904517 82.176069,100.934534 80.071127,102.541102 L55.3563842,102.541102 C48.9980168,95.2004977 43.2817655,85.0041384 37.8828997,72.0768932 C37.0323926,69.8867179 36.8184493,68.3567515 37.146203,67.1630432 C37.3587217,66.3924205 38.9767188,62.6139658 43.1096634,63.6593236 C43.9100166,63.8617593 44.9921488,64.3615988 46.0166435,66.2170448 C46.7113512,67.4752186 49.0648117,71.4601689 50.2590044,73.4092291 C50.8067348,74.3031884 51.8774381,74.0032372 51.8774381,73.154561 L51.8774381,41.6787565 C51.8774381,38.8901771 54.2009475,36.5681818 56.9913022,36.5681818 C59.7816569,36.5681818 62.1051663,38.8901771 62.1051663,41.6787565 L62.1051663,61.7308962 C63.7805457,60.469344 65.5698752,59.838568 67.4731547,59.838568 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-touch-drag-off\" viewBox=\"0 0 128 128\"><path d=\"M36.1019046,42.0819584 C36.1001047,42.0636704 36.0983283,42.0453756 36.0965754,42.0270739 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L37.1365273,33.1675309 C39.9715481,24.923791 47.7939863,19 57,19 C68.5979797,19 78,28.4020203 78,40 C78,46.6891376 74.8725041,52.6478094 70,56.4935277 L70,41 L69.9621104,41 C69.9872171,40.6699584 70,40.336472 70,40 C70,32.8202983 64.1797017,27 57,27 C49.8202983,27 44,32.8202983 44,40 C44,40.0103495 44.0000121,40.0206961 44.0000363,40.0310399 L51.8774381,47.9084417 L51.8774381,41.6787565 C51.8774381,38.8901771 54.2009475,36.5681818 56.9913022,36.5681818 C59.7816569,36.5681818 62.1051663,38.8901771 62.1051663,41.6787565 L62.1051663,58.1361699 L64.3958414,60.426845 C65.3861883,60.0346603 66.4119594,59.838568 67.4731547,59.838568 C72.4657245,59.838568 81.3112267,63.9016571 84.0522381,65.1740497 C86.7932495,66.4464422 88.4693079,67.7651397 89.3061282,70.7492444 C90.1641333,73.8087525 90.2181704,76.9246778 89.5140005,81.4868684 C89.3389802,82.6207712 89.1218173,83.7620069 88.8663552,84.8973588 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L86.5437453,92.4742439 C86.5392611,92.4855779 86.5347704,92.4969039 86.5302762,92.5082256 L51.8774381,57.8568335 L51.8774381,57.8079367 L44,49.9304985 L44,49.9797241 L36.1018778,42.0819315 Z M51.8774381,67.7562833 L83.1960026,99.0735409 C82.2038122,100.55335 81.1701652,101.702276 80.071127,102.541102 L55.3563842,102.541102 C48.9980168,95.2004977 43.2817655,85.0041384 37.8828997,72.0768932 C37.0323926,69.8867179 36.8184493,68.3567515 37.146203,67.1630432 C37.3587217,66.3924205 38.9767188,62.6139658 43.1096634,63.6593236 C43.9100166,63.8617593 44.9921488,64.3615988 46.0166435,66.2170448 C46.7113512,67.4752186 49.0648117,71.4601689 50.2590044,73.4092291 C50.8067348,74.3031884 51.8774381,74.0032372 51.8774381,73.154561 L51.8774381,67.7562833 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-mouse-drag\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M68.4731547,51.2723125 C73.4657245,51.2723125 82.3112267,55.337795 85.0522381,56.6109371 C87.7932495,57.8840791 89.4693079,59.2035534 90.3061282,62.1894158 C91.1641333,65.2507261 91.2181704,70.3684867 90.5140005,74.9333647 C89.8397289,79.3043356 88.5399773,83.7842062 86.8345008,87.6168052 C85.0411418,91.6467871 83.176069,94.3924861 81.071127,96 L56.3563842,96 C49.9980168,88.6550718 44.2817655,78.4527065 38.8828997,65.5178466 C38.0323926,63.3263812 37.8184493,61.7955136 38.146203,60.6011021 C38.3587217,59.8300255 39.9767188,56.0493452 44.1096634,57.0953188 C44.9100166,57.2978737 45.9921488,57.7980076 47.0166435,59.6545465 C47.7113512,60.9134615 50.0648117,64.9007591 51.2590044,66.8509673 C51.8067348,67.7454532 52.8774381,67.4453253 52.8774381,66.5961492 L52.8774381,53.1135851 C52.8774381,50.323363 55.0008843,48 58.9913022,48 C62.9817202,48 64.5,51.2723125 68.4731547,51.2723125 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-mouse-drag-off\" viewBox=\"0 0 128 128\"><path d=\"M52.8774381,58.8567918 L52.8774381,58.8079367 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L53.9682086,49.9992122 C54.9748711,48.7888303 56.6661487,48 58.9913022,48 C62.9817202,48 64.5,51.2723125 68.4731547,51.2723125 C73.4657245,51.2723125 82.3112267,55.337795 85.0522381,56.6109371 C87.7932495,57.8840791 89.4693079,59.2035534 90.3061282,62.1894158 C91.1641333,65.2507261 91.2181704,70.3684867 90.5140005,74.9333647 C90.0310923,78.0638208 89.2273557,81.2501351 88.1835194,84.2145221 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L85.1145339,91.0450325 C85.1087592,91.0551054 85.1029833,91.0651664 85.0972061,91.0752153 L52.8774381,58.8567918 Z M41.2753142,57.1546018 L80.1223335,96 L56.3563842,96 C49.9980168,88.6550718 44.2817655,78.4527065 38.8828997,65.5178466 C38.0323926,63.3263812 37.8184493,61.7955136 38.146203,60.6011021 C38.3009729,60.0395541 39.2011659,57.8818035 41.2753142,57.1546018 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-device-orientation\" viewBox=\"0 0 128 128\"><path d=\"M101,84 L94,84 L94,77 L101,77 L101,69 L116,80 L101,91 L101,84 Z M27,43 L34,43 L34,50 L27,50 L27,57 L12,46 L27,35 L27,43 Z M66.8407542,33.7409949 L87.860469,45.8767329 C90.2519321,47.2574448 91.0713079,50.3153968 89.690596,52.7068599 L66.2608489,93.2883724 C64.880137,95.6798355 61.822185,96.4992113 59.4307218,95.1184994 L38.411007,82.9827614 C36.0195439,81.6020495 35.2001681,78.5440975 36.58088,76.1526344 L60.0106272,35.5711219 C61.391339,33.1796588 64.4492911,32.360283 66.8407542,33.7409949 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-device-orientation-off\" viewBox=\"0 0 128 128\"><path d=\"M48.8764909,54.8560116 L48.8944343,54.8249328 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L52.5179009,48.5489045 L60.0106272,35.5711219 C61.391339,33.1796588 64.4492911,32.360283 66.8407542,33.7409949 L87.860469,45.8767329 C90.2519321,47.2574448 91.0713079,50.3153968 89.690596,52.7068599 L77.6063626,73.6373662 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L73.982896,79.9133945 L73.9653358,79.9438095 L48.8764909,54.8560116 Z M45.2529855,61.1321071 L70.3418304,86.2199051 L66.2608489,93.2883724 C64.880137,95.6798355 61.822185,96.4992113 59.4307218,95.1184994 L38.411007,82.9827614 C36.0195439,81.6020495 35.2001681,78.5440975 36.58088,76.1526344 L45.2529855,61.1321071 Z M27.1201217,43 L34,49.8795912 L34,50 L27,50 L27,57 L12,46 L22.453804,38.333877 L27,42.8798833 L27,43 L27.1201217,43 Z M101,84 L94,84 L94,77 L101,77 L101,69 L116,80 L101,91 L101,84 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-mouse-move\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M75.8857143,78.9539995 L81.4581429,92.5337243 C82.2561429,94.4945781 81.8625714,96.823769 80.2692857,98.4135772 C78.1494286,100.528808 74.7131429,100.528808 72.5932857,98.4135772 C72.064,97.8881551 71.6704286,97.2814821 71.3962857,96.6125168 L65.9052857,83.2223773 L52,89.1672309 L52,35 L90,72.9170616 L75.8857143,78.9539995 Z\" id=\"Combined-Shape\"></path></symbol><symbol id=\"icon-mouse-move-off\" viewBox=\"0 0 128 128\"><path d=\"M77.9108548,83.8891638 L52,57.9793903 L52,57.9304985 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L52,48.0310036 L52,35 L90,72.9170616 L80.8147551,76.8457587 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L77.8775825,83.8080811 L77.9108548,83.8891638 Z M81.2335075,97.1111276 C80.9858155,97.5794927 80.6644496,98.0192758 80.2692857,98.4135772 C78.1494286,100.528808 74.7131429,100.528808 72.5932857,98.4135772 C72.064,97.8881551 71.6704286,97.2814821 71.3962857,96.6125168 L65.9052857,83.2223773 L52,89.1672309 L52,67.8788401 L81.2335075,97.1111276 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\" id=\"Combined-Shape\"></path></symbol></svg>"

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

var Grid = function (enable) {

    this.xy = {};
    this.yz = {};
    this.xz = {};

    var width = 50,
        height = 50,
        stroke = 'red',
        strokeWidth = '1px';

    if (enable.xy) {
        this.xy = {
            className: 'grid grid-xy',
            width: width,
            height: height,
            position: {
                x: 0,
                y: height,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    }
    if (enable.yz) {
        this.yz = {
            className: 'grid grid-yz',
            width: 50,
            height: 50,
            position: {
                x: 0,
                y: height,
                z: 0
            },
            rotation: {
                x: 0,
                y: 90,
                z: 0
            }
        };
    }
    if (enable.xz) {
        this.xz = {
            className: 'grid grid-xz',
            width: 50,
            height: 50,
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 90,
                y: 0,
                z: 0
            }
        };
    }

    var style = document.createElement('style');
    style.innerHTML = '.grid {' + 'width: 100%;' + 'height: 100%;' + 'background-size:  10px 10px;' + 'background-image: linear-gradient(  0deg, ' + stroke + ' ' + strokeWidth + ', transparent ' + strokeWidth + ', transparent ),' + '                  linear-gradient( 90deg, ' + stroke + ' ' + strokeWidth + ', transparent ' + strokeWidth + ', transparent );' + '}';

    document.head.appendChild(style);
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

        childNode.id = attr.id || '';
        childNode.class = attr.className;

        attr.position = attr.position || {};

        childNode.setAttribute('x', attr.position.x || 0);
        childNode.setAttribute('y', attr.position.y || 0);
        childNode.setAttribute('z', attr.position.z || 0);

        attr.rotation = attr.rotation || {};

        childNode.setAttribute('rotation-x', attr.rotation.x || 0);
        childNode.setAttribute('rotation-y', attr.rotation.y || 0);
        childNode.setAttribute('rotation-z', attr.rotation.z || 0);

        childNode.setAttribute('width', attr.width || 0), childNode.setAttribute('height', attr.height || 0);

        // Add object to DOM and element.markup HTMLCollection
        object.appendChild(childNode);
        element.wrapper.appendChild(object);

        // Translate 3D attributes into CSS
        convertAttributes(object);
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
                x: childNode.getAttribute('x') || 0,
                y: childNode.getAttribute('y') || 0,
                z: childNode.getAttribute('z') || 0
            },
                rotation = {
                x: childNode.getAttribute('rotation-x') || 0,
                y: childNode.getAttribute('rotation-y') || 0,
                z: childNode.getAttribute('rotation-z') || 0
            },
                width = childNode.getAttribute('width') || 'auto',
                height = childNode.getAttribute('height') || 'auto';

            origin = {
                x: (50 - parseFloat(element.meta.OriginX)) * 2,
                y: (50 - parseFloat(element.meta.OriginY)) * 2

                // Translate attributes to CSS
            };childNode.id = id;
            childNode.className = className;

            placement.style.transformOrigin = 'center';
            placement.style.transform = ' translateX(' + -1 * (parseInt(position.x) + origin.x) + '%)' + ' translateY(' + -1 * (parseInt(position.y) + origin.y) + '%)' + ' translateZ(' + -1 * (position.z / 100 * element.width) + 'px)' + ' rotateX(' + rotation.x + 'deg)' + ' rotateY(' + rotation.y + 'deg)' + ' rotateZ(' + rotation.z + 'deg)';
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
                'justify-content': 'center'

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
            // values between 1 and -1
        y = 0,
            z = 0.5;

        panner.setPosition(x, y, z);
    };

    function play() {
        volume = 1;

        //audio.play()
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

/***/ "./src/scss/style.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });