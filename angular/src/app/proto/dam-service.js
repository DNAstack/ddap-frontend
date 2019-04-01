/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.dam = (function() {

    /**
     * Namespace dam.
     * @exports dam
     * @namespace
     */
    var dam = {};

    dam.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof dam
         * @namespace
         */
        var v1 = {};

        v1.DamConfig = (function() {

            /**
             * Properties of a DamConfig.
             * @memberof dam.v1
             * @interface IDamConfig
             * @property {string|null} [version] DamConfig version
             * @property {number|Long|null} [revision] DamConfig revision
             * @property {number|null} [commitTime] DamConfig commitTime
             * @property {Object.<string,dam.v1.ITrustedPassportIssuer>|null} [trustedPassportIssuers] DamConfig trustedPassportIssuers
             * @property {Object.<string,dam.v1.ITrustedSource>|null} [trustedSources] DamConfig trustedSources
             * @property {Object.<string,dam.v1.IPolicy>|null} [policies] DamConfig policies
             * @property {Object.<string,dam.v1.IResource>|null} [resources] DamConfig resources
             * @property {Object.<string,dam.v1.IClient>|null} [clients] DamConfig clients
             * @property {Object.<string,dam.v1.IServiceTemplate>|null} [serviceTemplates] DamConfig serviceTemplates
             * @property {Object.<string,dam.v1.IClaimDefinition>|null} [claimDefinitions] DamConfig claimDefinitions
             * @property {Object.<string,dam.v1.ITestPersona>|null} [testPersonas] DamConfig testPersonas
             * @property {dam.v1.IConfigOptions|null} [options] DamConfig options
             * @property {Object.<string,string>|null} [ui] DamConfig ui
             */

            /**
             * Constructs a new DamConfig.
             * @memberof dam.v1
             * @classdesc Represents a DamConfig.
             * @implements IDamConfig
             * @constructor
             * @param {dam.v1.IDamConfig=} [properties] Properties to set
             */
            function DamConfig(properties) {
                this.trustedPassportIssuers = {};
                this.trustedSources = {};
                this.policies = {};
                this.resources = {};
                this.clients = {};
                this.serviceTemplates = {};
                this.claimDefinitions = {};
                this.testPersonas = {};
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DamConfig version.
             * @member {string} version
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.version = "";

            /**
             * DamConfig revision.
             * @member {number|Long} revision
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * DamConfig commitTime.
             * @member {number} commitTime
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.commitTime = 0;

            /**
             * DamConfig trustedPassportIssuers.
             * @member {Object.<string,dam.v1.ITrustedPassportIssuer>} trustedPassportIssuers
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.trustedPassportIssuers = $util.emptyObject;

            /**
             * DamConfig trustedSources.
             * @member {Object.<string,dam.v1.ITrustedSource>} trustedSources
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.trustedSources = $util.emptyObject;

            /**
             * DamConfig policies.
             * @member {Object.<string,dam.v1.IPolicy>} policies
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.policies = $util.emptyObject;

            /**
             * DamConfig resources.
             * @member {Object.<string,dam.v1.IResource>} resources
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.resources = $util.emptyObject;

            /**
             * DamConfig clients.
             * @member {Object.<string,dam.v1.IClient>} clients
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.clients = $util.emptyObject;

            /**
             * DamConfig serviceTemplates.
             * @member {Object.<string,dam.v1.IServiceTemplate>} serviceTemplates
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.serviceTemplates = $util.emptyObject;

            /**
             * DamConfig claimDefinitions.
             * @member {Object.<string,dam.v1.IClaimDefinition>} claimDefinitions
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.claimDefinitions = $util.emptyObject;

            /**
             * DamConfig testPersonas.
             * @member {Object.<string,dam.v1.ITestPersona>} testPersonas
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.testPersonas = $util.emptyObject;

            /**
             * DamConfig options.
             * @member {dam.v1.IConfigOptions|null|undefined} options
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.options = null;

            /**
             * DamConfig ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.DamConfig
             * @instance
             */
            DamConfig.prototype.ui = $util.emptyObject;

            /**
             * Creates a new DamConfig instance using the specified properties.
             * @function create
             * @memberof dam.v1.DamConfig
             * @static
             * @param {dam.v1.IDamConfig=} [properties] Properties to set
             * @returns {dam.v1.DamConfig} DamConfig instance
             */
            DamConfig.create = function create(properties) {
                return new DamConfig(properties);
            };

            /**
             * Encodes the specified DamConfig message. Does not implicitly {@link dam.v1.DamConfig.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.DamConfig
             * @static
             * @param {dam.v1.IDamConfig} message DamConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                if (message.revision != null && message.hasOwnProperty("revision"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.commitTime);
                if (message.trustedPassportIssuers != null && message.hasOwnProperty("trustedPassportIssuers"))
                    for (var keys = Object.keys(message.trustedPassportIssuers), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.TrustedPassportIssuer.encode(message.trustedPassportIssuers[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.trustedSources != null && message.hasOwnProperty("trustedSources"))
                    for (var keys = Object.keys(message.trustedSources), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.TrustedSource.encode(message.trustedSources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.policies != null && message.hasOwnProperty("policies"))
                    for (var keys = Object.keys(message.policies), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.Policy.encode(message.policies[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.resources != null && message.hasOwnProperty("resources"))
                    for (var keys = Object.keys(message.resources), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 7, wireType 2 =*/58).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.Resource.encode(message.resources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.clients != null && message.hasOwnProperty("clients"))
                    for (var keys = Object.keys(message.clients), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.Client.encode(message.clients[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.serviceTemplates != null && message.hasOwnProperty("serviceTemplates"))
                    for (var keys = Object.keys(message.serviceTemplates), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 9, wireType 2 =*/74).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.ServiceTemplate.encode(message.serviceTemplates[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.claimDefinitions != null && message.hasOwnProperty("claimDefinitions"))
                    for (var keys = Object.keys(message.claimDefinitions), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 10, wireType 2 =*/82).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.ClaimDefinition.encode(message.claimDefinitions[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.testPersonas != null && message.hasOwnProperty("testPersonas"))
                    for (var keys = Object.keys(message.testPersonas), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 11, wireType 2 =*/90).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.TestPersona.encode(message.testPersonas[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.options != null && message.hasOwnProperty("options"))
                    $root.dam.v1.ConfigOptions.encode(message.options, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 13, wireType 2 =*/106).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DamConfig message, length delimited. Does not implicitly {@link dam.v1.DamConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.DamConfig
             * @static
             * @param {dam.v1.IDamConfig} message DamConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DamConfig message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.DamConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.DamConfig} DamConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.DamConfig(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.string();
                        break;
                    case 2:
                        message.revision = reader.int64();
                        break;
                    case 3:
                        message.commitTime = reader.double();
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.trustedPassportIssuers === $util.emptyObject)
                            message.trustedPassportIssuers = {};
                        key = reader.string();
                        reader.pos++;
                        message.trustedPassportIssuers[key] = $root.dam.v1.TrustedPassportIssuer.decode(reader, reader.uint32());
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.trustedSources === $util.emptyObject)
                            message.trustedSources = {};
                        key = reader.string();
                        reader.pos++;
                        message.trustedSources[key] = $root.dam.v1.TrustedSource.decode(reader, reader.uint32());
                        break;
                    case 6:
                        reader.skip().pos++;
                        if (message.policies === $util.emptyObject)
                            message.policies = {};
                        key = reader.string();
                        reader.pos++;
                        message.policies[key] = $root.dam.v1.Policy.decode(reader, reader.uint32());
                        break;
                    case 7:
                        reader.skip().pos++;
                        if (message.resources === $util.emptyObject)
                            message.resources = {};
                        key = reader.string();
                        reader.pos++;
                        message.resources[key] = $root.dam.v1.Resource.decode(reader, reader.uint32());
                        break;
                    case 8:
                        reader.skip().pos++;
                        if (message.clients === $util.emptyObject)
                            message.clients = {};
                        key = reader.string();
                        reader.pos++;
                        message.clients[key] = $root.dam.v1.Client.decode(reader, reader.uint32());
                        break;
                    case 9:
                        reader.skip().pos++;
                        if (message.serviceTemplates === $util.emptyObject)
                            message.serviceTemplates = {};
                        key = reader.string();
                        reader.pos++;
                        message.serviceTemplates[key] = $root.dam.v1.ServiceTemplate.decode(reader, reader.uint32());
                        break;
                    case 10:
                        reader.skip().pos++;
                        if (message.claimDefinitions === $util.emptyObject)
                            message.claimDefinitions = {};
                        key = reader.string();
                        reader.pos++;
                        message.claimDefinitions[key] = $root.dam.v1.ClaimDefinition.decode(reader, reader.uint32());
                        break;
                    case 11:
                        reader.skip().pos++;
                        if (message.testPersonas === $util.emptyObject)
                            message.testPersonas = {};
                        key = reader.string();
                        reader.pos++;
                        message.testPersonas[key] = $root.dam.v1.TestPersona.decode(reader, reader.uint32());
                        break;
                    case 12:
                        message.options = $root.dam.v1.ConfigOptions.decode(reader, reader.uint32());
                        break;
                    case 13:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DamConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.DamConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.DamConfig} DamConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DamConfig message.
             * @function verify
             * @memberof dam.v1.DamConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DamConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                        return "revision: integer|Long expected";
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    if (typeof message.commitTime !== "number")
                        return "commitTime: number expected";
                if (message.trustedPassportIssuers != null && message.hasOwnProperty("trustedPassportIssuers")) {
                    if (!$util.isObject(message.trustedPassportIssuers))
                        return "trustedPassportIssuers: object expected";
                    var key = Object.keys(message.trustedPassportIssuers);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.TrustedPassportIssuer.verify(message.trustedPassportIssuers[key[i]]);
                        if (error)
                            return "trustedPassportIssuers." + error;
                    }
                }
                if (message.trustedSources != null && message.hasOwnProperty("trustedSources")) {
                    if (!$util.isObject(message.trustedSources))
                        return "trustedSources: object expected";
                    var key = Object.keys(message.trustedSources);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.TrustedSource.verify(message.trustedSources[key[i]]);
                        if (error)
                            return "trustedSources." + error;
                    }
                }
                if (message.policies != null && message.hasOwnProperty("policies")) {
                    if (!$util.isObject(message.policies))
                        return "policies: object expected";
                    var key = Object.keys(message.policies);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.Policy.verify(message.policies[key[i]]);
                        if (error)
                            return "policies." + error;
                    }
                }
                if (message.resources != null && message.hasOwnProperty("resources")) {
                    if (!$util.isObject(message.resources))
                        return "resources: object expected";
                    var key = Object.keys(message.resources);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.Resource.verify(message.resources[key[i]]);
                        if (error)
                            return "resources." + error;
                    }
                }
                if (message.clients != null && message.hasOwnProperty("clients")) {
                    if (!$util.isObject(message.clients))
                        return "clients: object expected";
                    var key = Object.keys(message.clients);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.Client.verify(message.clients[key[i]]);
                        if (error)
                            return "clients." + error;
                    }
                }
                if (message.serviceTemplates != null && message.hasOwnProperty("serviceTemplates")) {
                    if (!$util.isObject(message.serviceTemplates))
                        return "serviceTemplates: object expected";
                    var key = Object.keys(message.serviceTemplates);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.ServiceTemplate.verify(message.serviceTemplates[key[i]]);
                        if (error)
                            return "serviceTemplates." + error;
                    }
                }
                if (message.claimDefinitions != null && message.hasOwnProperty("claimDefinitions")) {
                    if (!$util.isObject(message.claimDefinitions))
                        return "claimDefinitions: object expected";
                    var key = Object.keys(message.claimDefinitions);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.ClaimDefinition.verify(message.claimDefinitions[key[i]]);
                        if (error)
                            return "claimDefinitions." + error;
                    }
                }
                if (message.testPersonas != null && message.hasOwnProperty("testPersonas")) {
                    if (!$util.isObject(message.testPersonas))
                        return "testPersonas: object expected";
                    var key = Object.keys(message.testPersonas);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.TestPersona.verify(message.testPersonas[key[i]]);
                        if (error)
                            return "testPersonas." + error;
                    }
                }
                if (message.options != null && message.hasOwnProperty("options")) {
                    var error = $root.dam.v1.ConfigOptions.verify(message.options);
                    if (error)
                        return "options." + error;
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a DamConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.DamConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.DamConfig} DamConfig
             */
            DamConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.DamConfig)
                    return object;
                var message = new $root.dam.v1.DamConfig();
                if (object.version != null)
                    message.version = String(object.version);
                if (object.revision != null)
                    if ($util.Long)
                        (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                    else if (typeof object.revision === "string")
                        message.revision = parseInt(object.revision, 10);
                    else if (typeof object.revision === "number")
                        message.revision = object.revision;
                    else if (typeof object.revision === "object")
                        message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
                if (object.commitTime != null)
                    message.commitTime = Number(object.commitTime);
                if (object.trustedPassportIssuers) {
                    if (typeof object.trustedPassportIssuers !== "object")
                        throw TypeError(".dam.v1.DamConfig.trustedPassportIssuers: object expected");
                    message.trustedPassportIssuers = {};
                    for (var keys = Object.keys(object.trustedPassportIssuers), i = 0; i < keys.length; ++i) {
                        if (typeof object.trustedPassportIssuers[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.trustedPassportIssuers: object expected");
                        message.trustedPassportIssuers[keys[i]] = $root.dam.v1.TrustedPassportIssuer.fromObject(object.trustedPassportIssuers[keys[i]]);
                    }
                }
                if (object.trustedSources) {
                    if (typeof object.trustedSources !== "object")
                        throw TypeError(".dam.v1.DamConfig.trustedSources: object expected");
                    message.trustedSources = {};
                    for (var keys = Object.keys(object.trustedSources), i = 0; i < keys.length; ++i) {
                        if (typeof object.trustedSources[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.trustedSources: object expected");
                        message.trustedSources[keys[i]] = $root.dam.v1.TrustedSource.fromObject(object.trustedSources[keys[i]]);
                    }
                }
                if (object.policies) {
                    if (typeof object.policies !== "object")
                        throw TypeError(".dam.v1.DamConfig.policies: object expected");
                    message.policies = {};
                    for (var keys = Object.keys(object.policies), i = 0; i < keys.length; ++i) {
                        if (typeof object.policies[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.policies: object expected");
                        message.policies[keys[i]] = $root.dam.v1.Policy.fromObject(object.policies[keys[i]]);
                    }
                }
                if (object.resources) {
                    if (typeof object.resources !== "object")
                        throw TypeError(".dam.v1.DamConfig.resources: object expected");
                    message.resources = {};
                    for (var keys = Object.keys(object.resources), i = 0; i < keys.length; ++i) {
                        if (typeof object.resources[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.resources: object expected");
                        message.resources[keys[i]] = $root.dam.v1.Resource.fromObject(object.resources[keys[i]]);
                    }
                }
                if (object.clients) {
                    if (typeof object.clients !== "object")
                        throw TypeError(".dam.v1.DamConfig.clients: object expected");
                    message.clients = {};
                    for (var keys = Object.keys(object.clients), i = 0; i < keys.length; ++i) {
                        if (typeof object.clients[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.clients: object expected");
                        message.clients[keys[i]] = $root.dam.v1.Client.fromObject(object.clients[keys[i]]);
                    }
                }
                if (object.serviceTemplates) {
                    if (typeof object.serviceTemplates !== "object")
                        throw TypeError(".dam.v1.DamConfig.serviceTemplates: object expected");
                    message.serviceTemplates = {};
                    for (var keys = Object.keys(object.serviceTemplates), i = 0; i < keys.length; ++i) {
                        if (typeof object.serviceTemplates[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.serviceTemplates: object expected");
                        message.serviceTemplates[keys[i]] = $root.dam.v1.ServiceTemplate.fromObject(object.serviceTemplates[keys[i]]);
                    }
                }
                if (object.claimDefinitions) {
                    if (typeof object.claimDefinitions !== "object")
                        throw TypeError(".dam.v1.DamConfig.claimDefinitions: object expected");
                    message.claimDefinitions = {};
                    for (var keys = Object.keys(object.claimDefinitions), i = 0; i < keys.length; ++i) {
                        if (typeof object.claimDefinitions[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.claimDefinitions: object expected");
                        message.claimDefinitions[keys[i]] = $root.dam.v1.ClaimDefinition.fromObject(object.claimDefinitions[keys[i]]);
                    }
                }
                if (object.testPersonas) {
                    if (typeof object.testPersonas !== "object")
                        throw TypeError(".dam.v1.DamConfig.testPersonas: object expected");
                    message.testPersonas = {};
                    for (var keys = Object.keys(object.testPersonas), i = 0; i < keys.length; ++i) {
                        if (typeof object.testPersonas[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamConfig.testPersonas: object expected");
                        message.testPersonas[keys[i]] = $root.dam.v1.TestPersona.fromObject(object.testPersonas[keys[i]]);
                    }
                }
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".dam.v1.DamConfig.options: object expected");
                    message.options = $root.dam.v1.ConfigOptions.fromObject(object.options);
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.DamConfig.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a DamConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.DamConfig
             * @static
             * @param {dam.v1.DamConfig} message DamConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DamConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.trustedPassportIssuers = {};
                    object.trustedSources = {};
                    object.policies = {};
                    object.resources = {};
                    object.clients = {};
                    object.serviceTemplates = {};
                    object.claimDefinitions = {};
                    object.testPersonas = {};
                    object.ui = {};
                }
                if (options.defaults) {
                    object.version = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.revision = options.longs === String ? "0" : 0;
                    object.commitTime = 0;
                    object.options = null;
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (typeof message.revision === "number")
                        object.revision = options.longs === String ? String(message.revision) : message.revision;
                    else
                        object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    object.commitTime = options.json && !isFinite(message.commitTime) ? String(message.commitTime) : message.commitTime;
                var keys2;
                if (message.trustedPassportIssuers && (keys2 = Object.keys(message.trustedPassportIssuers)).length) {
                    object.trustedPassportIssuers = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.trustedPassportIssuers[keys2[j]] = $root.dam.v1.TrustedPassportIssuer.toObject(message.trustedPassportIssuers[keys2[j]], options);
                }
                if (message.trustedSources && (keys2 = Object.keys(message.trustedSources)).length) {
                    object.trustedSources = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.trustedSources[keys2[j]] = $root.dam.v1.TrustedSource.toObject(message.trustedSources[keys2[j]], options);
                }
                if (message.policies && (keys2 = Object.keys(message.policies)).length) {
                    object.policies = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.policies[keys2[j]] = $root.dam.v1.Policy.toObject(message.policies[keys2[j]], options);
                }
                if (message.resources && (keys2 = Object.keys(message.resources)).length) {
                    object.resources = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.resources[keys2[j]] = $root.dam.v1.Resource.toObject(message.resources[keys2[j]], options);
                }
                if (message.clients && (keys2 = Object.keys(message.clients)).length) {
                    object.clients = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.clients[keys2[j]] = $root.dam.v1.Client.toObject(message.clients[keys2[j]], options);
                }
                if (message.serviceTemplates && (keys2 = Object.keys(message.serviceTemplates)).length) {
                    object.serviceTemplates = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.serviceTemplates[keys2[j]] = $root.dam.v1.ServiceTemplate.toObject(message.serviceTemplates[keys2[j]], options);
                }
                if (message.claimDefinitions && (keys2 = Object.keys(message.claimDefinitions)).length) {
                    object.claimDefinitions = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.claimDefinitions[keys2[j]] = $root.dam.v1.ClaimDefinition.toObject(message.claimDefinitions[keys2[j]], options);
                }
                if (message.testPersonas && (keys2 = Object.keys(message.testPersonas)).length) {
                    object.testPersonas = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.testPersonas[keys2[j]] = $root.dam.v1.TestPersona.toObject(message.testPersonas[keys2[j]], options);
                }
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.dam.v1.ConfigOptions.toObject(message.options, options);
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this DamConfig to JSON.
             * @function toJSON
             * @memberof dam.v1.DamConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DamConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DamConfig;
        })();

        v1.TrustedPassportIssuer = (function() {

            /**
             * Properties of a TrustedPassportIssuer.
             * @memberof dam.v1
             * @interface ITrustedPassportIssuer
             * @property {string|null} [issuer] TrustedPassportIssuer issuer
             * @property {string|null} [translateUsing] TrustedPassportIssuer translateUsing
             * @property {Object.<string,string>|null} [ui] TrustedPassportIssuer ui
             */

            /**
             * Constructs a new TrustedPassportIssuer.
             * @memberof dam.v1
             * @classdesc Represents a TrustedPassportIssuer.
             * @implements ITrustedPassportIssuer
             * @constructor
             * @param {dam.v1.ITrustedPassportIssuer=} [properties] Properties to set
             */
            function TrustedPassportIssuer(properties) {
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TrustedPassportIssuer issuer.
             * @member {string} issuer
             * @memberof dam.v1.TrustedPassportIssuer
             * @instance
             */
            TrustedPassportIssuer.prototype.issuer = "";

            /**
             * TrustedPassportIssuer translateUsing.
             * @member {string} translateUsing
             * @memberof dam.v1.TrustedPassportIssuer
             * @instance
             */
            TrustedPassportIssuer.prototype.translateUsing = "";

            /**
             * TrustedPassportIssuer ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.TrustedPassportIssuer
             * @instance
             */
            TrustedPassportIssuer.prototype.ui = $util.emptyObject;

            /**
             * Creates a new TrustedPassportIssuer instance using the specified properties.
             * @function create
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {dam.v1.ITrustedPassportIssuer=} [properties] Properties to set
             * @returns {dam.v1.TrustedPassportIssuer} TrustedPassportIssuer instance
             */
            TrustedPassportIssuer.create = function create(properties) {
                return new TrustedPassportIssuer(properties);
            };

            /**
             * Encodes the specified TrustedPassportIssuer message. Does not implicitly {@link dam.v1.TrustedPassportIssuer.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {dam.v1.ITrustedPassportIssuer} message TrustedPassportIssuer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TrustedPassportIssuer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.issuer != null && message.hasOwnProperty("issuer"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.issuer);
                if (message.translateUsing != null && message.hasOwnProperty("translateUsing"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.translateUsing);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TrustedPassportIssuer message, length delimited. Does not implicitly {@link dam.v1.TrustedPassportIssuer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {dam.v1.ITrustedPassportIssuer} message TrustedPassportIssuer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TrustedPassportIssuer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TrustedPassportIssuer message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.TrustedPassportIssuer} TrustedPassportIssuer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TrustedPassportIssuer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TrustedPassportIssuer(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.issuer = reader.string();
                        break;
                    case 2:
                        message.translateUsing = reader.string();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TrustedPassportIssuer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.TrustedPassportIssuer} TrustedPassportIssuer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TrustedPassportIssuer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TrustedPassportIssuer message.
             * @function verify
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TrustedPassportIssuer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.issuer != null && message.hasOwnProperty("issuer"))
                    if (!$util.isString(message.issuer))
                        return "issuer: string expected";
                if (message.translateUsing != null && message.hasOwnProperty("translateUsing"))
                    if (!$util.isString(message.translateUsing))
                        return "translateUsing: string expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a TrustedPassportIssuer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.TrustedPassportIssuer} TrustedPassportIssuer
             */
            TrustedPassportIssuer.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.TrustedPassportIssuer)
                    return object;
                var message = new $root.dam.v1.TrustedPassportIssuer();
                if (object.issuer != null)
                    message.issuer = String(object.issuer);
                if (object.translateUsing != null)
                    message.translateUsing = String(object.translateUsing);
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.TrustedPassportIssuer.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a TrustedPassportIssuer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.TrustedPassportIssuer
             * @static
             * @param {dam.v1.TrustedPassportIssuer} message TrustedPassportIssuer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TrustedPassportIssuer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ui = {};
                if (options.defaults) {
                    object.issuer = "";
                    object.translateUsing = "";
                }
                if (message.issuer != null && message.hasOwnProperty("issuer"))
                    object.issuer = message.issuer;
                if (message.translateUsing != null && message.hasOwnProperty("translateUsing"))
                    object.translateUsing = message.translateUsing;
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this TrustedPassportIssuer to JSON.
             * @function toJSON
             * @memberof dam.v1.TrustedPassportIssuer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TrustedPassportIssuer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TrustedPassportIssuer;
        })();

        v1.TrustedSource = (function() {

            /**
             * Properties of a TrustedSource.
             * @memberof dam.v1
             * @interface ITrustedSource
             * @property {Array.<string>|null} [sources] TrustedSource sources
             * @property {Array.<string>|null} [claims] TrustedSource claims
             * @property {Object.<string,string>|null} [ui] TrustedSource ui
             */

            /**
             * Constructs a new TrustedSource.
             * @memberof dam.v1
             * @classdesc Represents a TrustedSource.
             * @implements ITrustedSource
             * @constructor
             * @param {dam.v1.ITrustedSource=} [properties] Properties to set
             */
            function TrustedSource(properties) {
                this.sources = [];
                this.claims = [];
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TrustedSource sources.
             * @member {Array.<string>} sources
             * @memberof dam.v1.TrustedSource
             * @instance
             */
            TrustedSource.prototype.sources = $util.emptyArray;

            /**
             * TrustedSource claims.
             * @member {Array.<string>} claims
             * @memberof dam.v1.TrustedSource
             * @instance
             */
            TrustedSource.prototype.claims = $util.emptyArray;

            /**
             * TrustedSource ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.TrustedSource
             * @instance
             */
            TrustedSource.prototype.ui = $util.emptyObject;

            /**
             * Creates a new TrustedSource instance using the specified properties.
             * @function create
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {dam.v1.ITrustedSource=} [properties] Properties to set
             * @returns {dam.v1.TrustedSource} TrustedSource instance
             */
            TrustedSource.create = function create(properties) {
                return new TrustedSource(properties);
            };

            /**
             * Encodes the specified TrustedSource message. Does not implicitly {@link dam.v1.TrustedSource.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {dam.v1.ITrustedSource} message TrustedSource message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TrustedSource.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sources != null && message.sources.length)
                    for (var i = 0; i < message.sources.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sources[i]);
                if (message.claims != null && message.claims.length)
                    for (var i = 0; i < message.claims.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.claims[i]);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TrustedSource message, length delimited. Does not implicitly {@link dam.v1.TrustedSource.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {dam.v1.ITrustedSource} message TrustedSource message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TrustedSource.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TrustedSource message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.TrustedSource} TrustedSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TrustedSource.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TrustedSource(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.sources && message.sources.length))
                            message.sources = [];
                        message.sources.push(reader.string());
                        break;
                    case 2:
                        if (!(message.claims && message.claims.length))
                            message.claims = [];
                        message.claims.push(reader.string());
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TrustedSource message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.TrustedSource} TrustedSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TrustedSource.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TrustedSource message.
             * @function verify
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TrustedSource.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.sources != null && message.hasOwnProperty("sources")) {
                    if (!Array.isArray(message.sources))
                        return "sources: array expected";
                    for (var i = 0; i < message.sources.length; ++i)
                        if (!$util.isString(message.sources[i]))
                            return "sources: string[] expected";
                }
                if (message.claims != null && message.hasOwnProperty("claims")) {
                    if (!Array.isArray(message.claims))
                        return "claims: array expected";
                    for (var i = 0; i < message.claims.length; ++i)
                        if (!$util.isString(message.claims[i]))
                            return "claims: string[] expected";
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a TrustedSource message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.TrustedSource} TrustedSource
             */
            TrustedSource.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.TrustedSource)
                    return object;
                var message = new $root.dam.v1.TrustedSource();
                if (object.sources) {
                    if (!Array.isArray(object.sources))
                        throw TypeError(".dam.v1.TrustedSource.sources: array expected");
                    message.sources = [];
                    for (var i = 0; i < object.sources.length; ++i)
                        message.sources[i] = String(object.sources[i]);
                }
                if (object.claims) {
                    if (!Array.isArray(object.claims))
                        throw TypeError(".dam.v1.TrustedSource.claims: array expected");
                    message.claims = [];
                    for (var i = 0; i < object.claims.length; ++i)
                        message.claims[i] = String(object.claims[i]);
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.TrustedSource.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a TrustedSource message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.TrustedSource
             * @static
             * @param {dam.v1.TrustedSource} message TrustedSource
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TrustedSource.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.sources = [];
                    object.claims = [];
                }
                if (options.objects || options.defaults)
                    object.ui = {};
                if (message.sources && message.sources.length) {
                    object.sources = [];
                    for (var j = 0; j < message.sources.length; ++j)
                        object.sources[j] = message.sources[j];
                }
                if (message.claims && message.claims.length) {
                    object.claims = [];
                    for (var j = 0; j < message.claims.length; ++j)
                        object.claims[j] = message.claims[j];
                }
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this TrustedSource to JSON.
             * @function toJSON
             * @memberof dam.v1.TrustedSource
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TrustedSource.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TrustedSource;
        })();

        v1.Condition = (function() {

            /**
             * Properties of a Condition.
             * @memberof dam.v1
             * @interface ICondition
             * @property {string|null} [claim] Condition claim
             * @property {string|null} [dataUse] Condition dataUse
             * @property {string|null} [userList] Condition userList
             * @property {string|null} [is] Condition is
             * @property {Array.<string>|null} [values] Condition values
             * @property {Array.<string>|null} [from] Condition from
             * @property {Array.<dam.v1.ICondition>|null} [allTrue] Condition allTrue
             * @property {Array.<dam.v1.ICondition>|null} [anyTrue] Condition anyTrue
             */

            /**
             * Constructs a new Condition.
             * @memberof dam.v1
             * @classdesc Represents a Condition.
             * @implements ICondition
             * @constructor
             * @param {dam.v1.ICondition=} [properties] Properties to set
             */
            function Condition(properties) {
                this.values = [];
                this.from = [];
                this.allTrue = [];
                this.anyTrue = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Condition claim.
             * @member {string} claim
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.claim = "";

            /**
             * Condition dataUse.
             * @member {string} dataUse
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.dataUse = "";

            /**
             * Condition userList.
             * @member {string} userList
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.userList = "";

            /**
             * Condition is.
             * @member {string} is
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.is = "";

            /**
             * Condition values.
             * @member {Array.<string>} values
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.values = $util.emptyArray;

            /**
             * Condition from.
             * @member {Array.<string>} from
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.from = $util.emptyArray;

            /**
             * Condition allTrue.
             * @member {Array.<dam.v1.ICondition>} allTrue
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.allTrue = $util.emptyArray;

            /**
             * Condition anyTrue.
             * @member {Array.<dam.v1.ICondition>} anyTrue
             * @memberof dam.v1.Condition
             * @instance
             */
            Condition.prototype.anyTrue = $util.emptyArray;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Condition key.
             * @member {"claim"|"dataUse"|"userList"|undefined} key
             * @memberof dam.v1.Condition
             * @instance
             */
            Object.defineProperty(Condition.prototype, "key", {
                get: $util.oneOfGetter($oneOfFields = ["claim", "dataUse", "userList"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Condition instance using the specified properties.
             * @function create
             * @memberof dam.v1.Condition
             * @static
             * @param {dam.v1.ICondition=} [properties] Properties to set
             * @returns {dam.v1.Condition} Condition instance
             */
            Condition.create = function create(properties) {
                return new Condition(properties);
            };

            /**
             * Encodes the specified Condition message. Does not implicitly {@link dam.v1.Condition.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.Condition
             * @static
             * @param {dam.v1.ICondition} message Condition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Condition.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.claim != null && message.hasOwnProperty("claim"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.claim);
                if (message.dataUse != null && message.hasOwnProperty("dataUse"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.dataUse);
                if (message.userList != null && message.hasOwnProperty("userList"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.userList);
                if (message.is != null && message.hasOwnProperty("is"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.is);
                if (message.values != null && message.values.length)
                    for (var i = 0; i < message.values.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.values[i]);
                if (message.from != null && message.from.length)
                    for (var i = 0; i < message.from.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.from[i]);
                if (message.allTrue != null && message.allTrue.length)
                    for (var i = 0; i < message.allTrue.length; ++i)
                        $root.dam.v1.Condition.encode(message.allTrue[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.anyTrue != null && message.anyTrue.length)
                    for (var i = 0; i < message.anyTrue.length; ++i)
                        $root.dam.v1.Condition.encode(message.anyTrue[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Condition message, length delimited. Does not implicitly {@link dam.v1.Condition.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.Condition
             * @static
             * @param {dam.v1.ICondition} message Condition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Condition.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Condition message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.Condition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.Condition} Condition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Condition.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.Condition();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.claim = reader.string();
                        break;
                    case 2:
                        message.dataUse = reader.string();
                        break;
                    case 3:
                        message.userList = reader.string();
                        break;
                    case 4:
                        message.is = reader.string();
                        break;
                    case 5:
                        if (!(message.values && message.values.length))
                            message.values = [];
                        message.values.push(reader.string());
                        break;
                    case 6:
                        if (!(message.from && message.from.length))
                            message.from = [];
                        message.from.push(reader.string());
                        break;
                    case 7:
                        if (!(message.allTrue && message.allTrue.length))
                            message.allTrue = [];
                        message.allTrue.push($root.dam.v1.Condition.decode(reader, reader.uint32()));
                        break;
                    case 8:
                        if (!(message.anyTrue && message.anyTrue.length))
                            message.anyTrue = [];
                        message.anyTrue.push($root.dam.v1.Condition.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Condition message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.Condition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.Condition} Condition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Condition.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Condition message.
             * @function verify
             * @memberof dam.v1.Condition
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Condition.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.claim != null && message.hasOwnProperty("claim")) {
                    properties.key = 1;
                    if (!$util.isString(message.claim))
                        return "claim: string expected";
                }
                if (message.dataUse != null && message.hasOwnProperty("dataUse")) {
                    if (properties.key === 1)
                        return "key: multiple values";
                    properties.key = 1;
                    if (!$util.isString(message.dataUse))
                        return "dataUse: string expected";
                }
                if (message.userList != null && message.hasOwnProperty("userList")) {
                    if (properties.key === 1)
                        return "key: multiple values";
                    properties.key = 1;
                    if (!$util.isString(message.userList))
                        return "userList: string expected";
                }
                if (message.is != null && message.hasOwnProperty("is"))
                    if (!$util.isString(message.is))
                        return "is: string expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                    if (!Array.isArray(message.values))
                        return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i)
                        if (!$util.isString(message.values[i]))
                            return "values: string[] expected";
                }
                if (message.from != null && message.hasOwnProperty("from")) {
                    if (!Array.isArray(message.from))
                        return "from: array expected";
                    for (var i = 0; i < message.from.length; ++i)
                        if (!$util.isString(message.from[i]))
                            return "from: string[] expected";
                }
                if (message.allTrue != null && message.hasOwnProperty("allTrue")) {
                    if (!Array.isArray(message.allTrue))
                        return "allTrue: array expected";
                    for (var i = 0; i < message.allTrue.length; ++i) {
                        var error = $root.dam.v1.Condition.verify(message.allTrue[i]);
                        if (error)
                            return "allTrue." + error;
                    }
                }
                if (message.anyTrue != null && message.hasOwnProperty("anyTrue")) {
                    if (!Array.isArray(message.anyTrue))
                        return "anyTrue: array expected";
                    for (var i = 0; i < message.anyTrue.length; ++i) {
                        var error = $root.dam.v1.Condition.verify(message.anyTrue[i]);
                        if (error)
                            return "anyTrue." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Condition message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.Condition
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.Condition} Condition
             */
            Condition.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.Condition)
                    return object;
                var message = new $root.dam.v1.Condition();
                if (object.claim != null)
                    message.claim = String(object.claim);
                if (object.dataUse != null)
                    message.dataUse = String(object.dataUse);
                if (object.userList != null)
                    message.userList = String(object.userList);
                if (object.is != null)
                    message.is = String(object.is);
                if (object.values) {
                    if (!Array.isArray(object.values))
                        throw TypeError(".dam.v1.Condition.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i)
                        message.values[i] = String(object.values[i]);
                }
                if (object.from) {
                    if (!Array.isArray(object.from))
                        throw TypeError(".dam.v1.Condition.from: array expected");
                    message.from = [];
                    for (var i = 0; i < object.from.length; ++i)
                        message.from[i] = String(object.from[i]);
                }
                if (object.allTrue) {
                    if (!Array.isArray(object.allTrue))
                        throw TypeError(".dam.v1.Condition.allTrue: array expected");
                    message.allTrue = [];
                    for (var i = 0; i < object.allTrue.length; ++i) {
                        if (typeof object.allTrue[i] !== "object")
                            throw TypeError(".dam.v1.Condition.allTrue: object expected");
                        message.allTrue[i] = $root.dam.v1.Condition.fromObject(object.allTrue[i]);
                    }
                }
                if (object.anyTrue) {
                    if (!Array.isArray(object.anyTrue))
                        throw TypeError(".dam.v1.Condition.anyTrue: array expected");
                    message.anyTrue = [];
                    for (var i = 0; i < object.anyTrue.length; ++i) {
                        if (typeof object.anyTrue[i] !== "object")
                            throw TypeError(".dam.v1.Condition.anyTrue: object expected");
                        message.anyTrue[i] = $root.dam.v1.Condition.fromObject(object.anyTrue[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Condition message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.Condition
             * @static
             * @param {dam.v1.Condition} message Condition
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Condition.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.values = [];
                    object.from = [];
                    object.allTrue = [];
                    object.anyTrue = [];
                }
                if (options.defaults)
                    object.is = "";
                if (message.claim != null && message.hasOwnProperty("claim")) {
                    object.claim = message.claim;
                    if (options.oneofs)
                        object.key = "claim";
                }
                if (message.dataUse != null && message.hasOwnProperty("dataUse")) {
                    object.dataUse = message.dataUse;
                    if (options.oneofs)
                        object.key = "dataUse";
                }
                if (message.userList != null && message.hasOwnProperty("userList")) {
                    object.userList = message.userList;
                    if (options.oneofs)
                        object.key = "userList";
                }
                if (message.is != null && message.hasOwnProperty("is"))
                    object.is = message.is;
                if (message.values && message.values.length) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                        object.values[j] = message.values[j];
                }
                if (message.from && message.from.length) {
                    object.from = [];
                    for (var j = 0; j < message.from.length; ++j)
                        object.from[j] = message.from[j];
                }
                if (message.allTrue && message.allTrue.length) {
                    object.allTrue = [];
                    for (var j = 0; j < message.allTrue.length; ++j)
                        object.allTrue[j] = $root.dam.v1.Condition.toObject(message.allTrue[j], options);
                }
                if (message.anyTrue && message.anyTrue.length) {
                    object.anyTrue = [];
                    for (var j = 0; j < message.anyTrue.length; ++j)
                        object.anyTrue[j] = $root.dam.v1.Condition.toObject(message.anyTrue[j], options);
                }
                return object;
            };

            /**
             * Converts this Condition to JSON.
             * @function toJSON
             * @memberof dam.v1.Condition
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Condition.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Condition;
        })();

        v1.Policy = (function() {

            /**
             * Properties of a Policy.
             * @memberof dam.v1
             * @interface IPolicy
             * @property {dam.v1.ICondition|null} [allow] Policy allow
             * @property {dam.v1.ICondition|null} [disallow] Policy disallow
             * @property {Object.<string,string>|null} [ui] Policy ui
             */

            /**
             * Constructs a new Policy.
             * @memberof dam.v1
             * @classdesc Represents a Policy.
             * @implements IPolicy
             * @constructor
             * @param {dam.v1.IPolicy=} [properties] Properties to set
             */
            function Policy(properties) {
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Policy allow.
             * @member {dam.v1.ICondition|null|undefined} allow
             * @memberof dam.v1.Policy
             * @instance
             */
            Policy.prototype.allow = null;

            /**
             * Policy disallow.
             * @member {dam.v1.ICondition|null|undefined} disallow
             * @memberof dam.v1.Policy
             * @instance
             */
            Policy.prototype.disallow = null;

            /**
             * Policy ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.Policy
             * @instance
             */
            Policy.prototype.ui = $util.emptyObject;

            /**
             * Creates a new Policy instance using the specified properties.
             * @function create
             * @memberof dam.v1.Policy
             * @static
             * @param {dam.v1.IPolicy=} [properties] Properties to set
             * @returns {dam.v1.Policy} Policy instance
             */
            Policy.create = function create(properties) {
                return new Policy(properties);
            };

            /**
             * Encodes the specified Policy message. Does not implicitly {@link dam.v1.Policy.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.Policy
             * @static
             * @param {dam.v1.IPolicy} message Policy message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Policy.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.allow != null && message.hasOwnProperty("allow"))
                    $root.dam.v1.Condition.encode(message.allow, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.disallow != null && message.hasOwnProperty("disallow"))
                    $root.dam.v1.Condition.encode(message.disallow, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Policy message, length delimited. Does not implicitly {@link dam.v1.Policy.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.Policy
             * @static
             * @param {dam.v1.IPolicy} message Policy message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Policy.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Policy message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.Policy
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.Policy} Policy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Policy.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.Policy(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.allow = $root.dam.v1.Condition.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.disallow = $root.dam.v1.Condition.decode(reader, reader.uint32());
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Policy message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.Policy
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.Policy} Policy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Policy.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Policy message.
             * @function verify
             * @memberof dam.v1.Policy
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Policy.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.allow != null && message.hasOwnProperty("allow")) {
                    var error = $root.dam.v1.Condition.verify(message.allow);
                    if (error)
                        return "allow." + error;
                }
                if (message.disallow != null && message.hasOwnProperty("disallow")) {
                    var error = $root.dam.v1.Condition.verify(message.disallow);
                    if (error)
                        return "disallow." + error;
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a Policy message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.Policy
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.Policy} Policy
             */
            Policy.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.Policy)
                    return object;
                var message = new $root.dam.v1.Policy();
                if (object.allow != null) {
                    if (typeof object.allow !== "object")
                        throw TypeError(".dam.v1.Policy.allow: object expected");
                    message.allow = $root.dam.v1.Condition.fromObject(object.allow);
                }
                if (object.disallow != null) {
                    if (typeof object.disallow !== "object")
                        throw TypeError(".dam.v1.Policy.disallow: object expected");
                    message.disallow = $root.dam.v1.Condition.fromObject(object.disallow);
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.Policy.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Policy message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.Policy
             * @static
             * @param {dam.v1.Policy} message Policy
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Policy.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ui = {};
                if (options.defaults) {
                    object.allow = null;
                    object.disallow = null;
                }
                if (message.allow != null && message.hasOwnProperty("allow"))
                    object.allow = $root.dam.v1.Condition.toObject(message.allow, options);
                if (message.disallow != null && message.hasOwnProperty("disallow"))
                    object.disallow = $root.dam.v1.Condition.toObject(message.disallow, options);
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this Policy to JSON.
             * @function toJSON
             * @memberof dam.v1.Policy
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Policy.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Policy;
        })();

        v1.PolicyBasis = (function() {

            /**
             * Properties of a PolicyBasis.
             * @memberof dam.v1
             * @interface IPolicyBasis
             * @property {string|null} [name] PolicyBasis name
             * @property {string|null} [type] PolicyBasis type
             * @property {Array.<string>|null} [clauses] PolicyBasis clauses
             */

            /**
             * Constructs a new PolicyBasis.
             * @memberof dam.v1
             * @classdesc Represents a PolicyBasis.
             * @implements IPolicyBasis
             * @constructor
             * @param {dam.v1.IPolicyBasis=} [properties] Properties to set
             */
            function PolicyBasis(properties) {
                this.clauses = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PolicyBasis name.
             * @member {string} name
             * @memberof dam.v1.PolicyBasis
             * @instance
             */
            PolicyBasis.prototype.name = "";

            /**
             * PolicyBasis type.
             * @member {string} type
             * @memberof dam.v1.PolicyBasis
             * @instance
             */
            PolicyBasis.prototype.type = "";

            /**
             * PolicyBasis clauses.
             * @member {Array.<string>} clauses
             * @memberof dam.v1.PolicyBasis
             * @instance
             */
            PolicyBasis.prototype.clauses = $util.emptyArray;

            /**
             * Creates a new PolicyBasis instance using the specified properties.
             * @function create
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {dam.v1.IPolicyBasis=} [properties] Properties to set
             * @returns {dam.v1.PolicyBasis} PolicyBasis instance
             */
            PolicyBasis.create = function create(properties) {
                return new PolicyBasis(properties);
            };

            /**
             * Encodes the specified PolicyBasis message. Does not implicitly {@link dam.v1.PolicyBasis.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {dam.v1.IPolicyBasis} message PolicyBasis message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PolicyBasis.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
                if (message.clauses != null && message.clauses.length)
                    for (var i = 0; i < message.clauses.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.clauses[i]);
                return writer;
            };

            /**
             * Encodes the specified PolicyBasis message, length delimited. Does not implicitly {@link dam.v1.PolicyBasis.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {dam.v1.IPolicyBasis} message PolicyBasis message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PolicyBasis.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PolicyBasis message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.PolicyBasis} PolicyBasis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PolicyBasis.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.PolicyBasis();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.type = reader.string();
                        break;
                    case 3:
                        if (!(message.clauses && message.clauses.length))
                            message.clauses = [];
                        message.clauses.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PolicyBasis message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.PolicyBasis} PolicyBasis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PolicyBasis.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PolicyBasis message.
             * @function verify
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PolicyBasis.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.clauses != null && message.hasOwnProperty("clauses")) {
                    if (!Array.isArray(message.clauses))
                        return "clauses: array expected";
                    for (var i = 0; i < message.clauses.length; ++i)
                        if (!$util.isString(message.clauses[i]))
                            return "clauses: string[] expected";
                }
                return null;
            };

            /**
             * Creates a PolicyBasis message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.PolicyBasis} PolicyBasis
             */
            PolicyBasis.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.PolicyBasis)
                    return object;
                var message = new $root.dam.v1.PolicyBasis();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.type != null)
                    message.type = String(object.type);
                if (object.clauses) {
                    if (!Array.isArray(object.clauses))
                        throw TypeError(".dam.v1.PolicyBasis.clauses: array expected");
                    message.clauses = [];
                    for (var i = 0; i < object.clauses.length; ++i)
                        message.clauses[i] = String(object.clauses[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a PolicyBasis message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.PolicyBasis
             * @static
             * @param {dam.v1.PolicyBasis} message PolicyBasis
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PolicyBasis.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.clauses = [];
                if (options.defaults) {
                    object.name = "";
                    object.type = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.clauses && message.clauses.length) {
                    object.clauses = [];
                    for (var j = 0; j < message.clauses.length; ++j)
                        object.clauses[j] = message.clauses[j];
                }
                return object;
            };

            /**
             * Converts this PolicyBasis to JSON.
             * @function toJSON
             * @memberof dam.v1.PolicyBasis
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PolicyBasis.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PolicyBasis;
        })();

        v1.View = (function() {

            /**
             * Properties of a View.
             * @memberof dam.v1
             * @interface IView
             * @property {string|null} [serviceTemplate] View serviceTemplate
             * @property {string|null} [version] View version
             * @property {string|null} [topic] View topic
             * @property {string|null} [partition] View partition
             * @property {string|null} [fidelity] View fidelity
             * @property {string|null} [geoLocation] View geoLocation
             * @property {Array.<string>|null} [contentTypes] View contentTypes
             * @property {Object.<string,dam.v1.IAccessRole>|null} [accessRoles] View accessRoles
             * @property {Array.<dam.v1.View.IItem>|null} [items] View items
             * @property {string|null} [aud] View aud
             * @property {string|null} [defaultRole] View defaultRole
             * @property {Object.<string,string>|null} [ui] View ui
             * @property {Object.<string,dam.v1.View.IInterface>|null} [computedInterfaces] View computedInterfaces
             */

            /**
             * Constructs a new View.
             * @memberof dam.v1
             * @classdesc Represents a View.
             * @implements IView
             * @constructor
             * @param {dam.v1.IView=} [properties] Properties to set
             */
            function View(properties) {
                this.contentTypes = [];
                this.accessRoles = {};
                this.items = [];
                this.ui = {};
                this.computedInterfaces = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * View serviceTemplate.
             * @member {string} serviceTemplate
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.serviceTemplate = "";

            /**
             * View version.
             * @member {string} version
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.version = "";

            /**
             * View topic.
             * @member {string} topic
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.topic = "";

            /**
             * View partition.
             * @member {string} partition
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.partition = "";

            /**
             * View fidelity.
             * @member {string} fidelity
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.fidelity = "";

            /**
             * View geoLocation.
             * @member {string} geoLocation
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.geoLocation = "";

            /**
             * View contentTypes.
             * @member {Array.<string>} contentTypes
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.contentTypes = $util.emptyArray;

            /**
             * View accessRoles.
             * @member {Object.<string,dam.v1.IAccessRole>} accessRoles
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.accessRoles = $util.emptyObject;

            /**
             * View items.
             * @member {Array.<dam.v1.View.IItem>} items
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.items = $util.emptyArray;

            /**
             * View aud.
             * @member {string} aud
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.aud = "";

            /**
             * View defaultRole.
             * @member {string} defaultRole
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.defaultRole = "";

            /**
             * View ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.ui = $util.emptyObject;

            /**
             * View computedInterfaces.
             * @member {Object.<string,dam.v1.View.IInterface>} computedInterfaces
             * @memberof dam.v1.View
             * @instance
             */
            View.prototype.computedInterfaces = $util.emptyObject;

            /**
             * Creates a new View instance using the specified properties.
             * @function create
             * @memberof dam.v1.View
             * @static
             * @param {dam.v1.IView=} [properties] Properties to set
             * @returns {dam.v1.View} View instance
             */
            View.create = function create(properties) {
                return new View(properties);
            };

            /**
             * Encodes the specified View message. Does not implicitly {@link dam.v1.View.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.View
             * @static
             * @param {dam.v1.IView} message View message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            View.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.serviceTemplate != null && message.hasOwnProperty("serviceTemplate"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.serviceTemplate);
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
                if (message.topic != null && message.hasOwnProperty("topic"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.topic);
                if (message.partition != null && message.hasOwnProperty("partition"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.partition);
                if (message.fidelity != null && message.hasOwnProperty("fidelity"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.fidelity);
                if (message.geoLocation != null && message.hasOwnProperty("geoLocation"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.geoLocation);
                if (message.contentTypes != null && message.contentTypes.length)
                    for (var i = 0; i < message.contentTypes.length; ++i)
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.contentTypes[i]);
                if (message.accessRoles != null && message.hasOwnProperty("accessRoles"))
                    for (var keys = Object.keys(message.accessRoles), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.AccessRole.encode(message.accessRoles[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.items != null && message.items.length)
                    for (var i = 0; i < message.items.length; ++i)
                        $root.dam.v1.View.Item.encode(message.items[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.aud != null && message.hasOwnProperty("aud"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.aud);
                if (message.defaultRole != null && message.hasOwnProperty("defaultRole"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.defaultRole);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 12, wireType 2 =*/98).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                if (message.computedInterfaces != null && message.hasOwnProperty("computedInterfaces"))
                    for (var keys = Object.keys(message.computedInterfaces), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 13, wireType 2 =*/106).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.View.Interface.encode(message.computedInterfaces[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified View message, length delimited. Does not implicitly {@link dam.v1.View.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.View
             * @static
             * @param {dam.v1.IView} message View message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            View.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a View message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.View
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.View} View
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            View.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.View(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.serviceTemplate = reader.string();
                        break;
                    case 2:
                        message.version = reader.string();
                        break;
                    case 3:
                        message.topic = reader.string();
                        break;
                    case 4:
                        message.partition = reader.string();
                        break;
                    case 5:
                        message.fidelity = reader.string();
                        break;
                    case 6:
                        message.geoLocation = reader.string();
                        break;
                    case 7:
                        if (!(message.contentTypes && message.contentTypes.length))
                            message.contentTypes = [];
                        message.contentTypes.push(reader.string());
                        break;
                    case 8:
                        reader.skip().pos++;
                        if (message.accessRoles === $util.emptyObject)
                            message.accessRoles = {};
                        key = reader.string();
                        reader.pos++;
                        message.accessRoles[key] = $root.dam.v1.AccessRole.decode(reader, reader.uint32());
                        break;
                    case 9:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.dam.v1.View.Item.decode(reader, reader.uint32()));
                        break;
                    case 10:
                        message.aud = reader.string();
                        break;
                    case 11:
                        message.defaultRole = reader.string();
                        break;
                    case 12:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    case 13:
                        reader.skip().pos++;
                        if (message.computedInterfaces === $util.emptyObject)
                            message.computedInterfaces = {};
                        key = reader.string();
                        reader.pos++;
                        message.computedInterfaces[key] = $root.dam.v1.View.Interface.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a View message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.View
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.View} View
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            View.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a View message.
             * @function verify
             * @memberof dam.v1.View
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            View.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.serviceTemplate != null && message.hasOwnProperty("serviceTemplate"))
                    if (!$util.isString(message.serviceTemplate))
                        return "serviceTemplate: string expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.topic != null && message.hasOwnProperty("topic"))
                    if (!$util.isString(message.topic))
                        return "topic: string expected";
                if (message.partition != null && message.hasOwnProperty("partition"))
                    if (!$util.isString(message.partition))
                        return "partition: string expected";
                if (message.fidelity != null && message.hasOwnProperty("fidelity"))
                    if (!$util.isString(message.fidelity))
                        return "fidelity: string expected";
                if (message.geoLocation != null && message.hasOwnProperty("geoLocation"))
                    if (!$util.isString(message.geoLocation))
                        return "geoLocation: string expected";
                if (message.contentTypes != null && message.hasOwnProperty("contentTypes")) {
                    if (!Array.isArray(message.contentTypes))
                        return "contentTypes: array expected";
                    for (var i = 0; i < message.contentTypes.length; ++i)
                        if (!$util.isString(message.contentTypes[i]))
                            return "contentTypes: string[] expected";
                }
                if (message.accessRoles != null && message.hasOwnProperty("accessRoles")) {
                    if (!$util.isObject(message.accessRoles))
                        return "accessRoles: object expected";
                    var key = Object.keys(message.accessRoles);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.AccessRole.verify(message.accessRoles[key[i]]);
                        if (error)
                            return "accessRoles." + error;
                    }
                }
                if (message.items != null && message.hasOwnProperty("items")) {
                    if (!Array.isArray(message.items))
                        return "items: array expected";
                    for (var i = 0; i < message.items.length; ++i) {
                        var error = $root.dam.v1.View.Item.verify(message.items[i]);
                        if (error)
                            return "items." + error;
                    }
                }
                if (message.aud != null && message.hasOwnProperty("aud"))
                    if (!$util.isString(message.aud))
                        return "aud: string expected";
                if (message.defaultRole != null && message.hasOwnProperty("defaultRole"))
                    if (!$util.isString(message.defaultRole))
                        return "defaultRole: string expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                if (message.computedInterfaces != null && message.hasOwnProperty("computedInterfaces")) {
                    if (!$util.isObject(message.computedInterfaces))
                        return "computedInterfaces: object expected";
                    var key = Object.keys(message.computedInterfaces);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.View.Interface.verify(message.computedInterfaces[key[i]]);
                        if (error)
                            return "computedInterfaces." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a View message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.View
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.View} View
             */
            View.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.View)
                    return object;
                var message = new $root.dam.v1.View();
                if (object.serviceTemplate != null)
                    message.serviceTemplate = String(object.serviceTemplate);
                if (object.version != null)
                    message.version = String(object.version);
                if (object.topic != null)
                    message.topic = String(object.topic);
                if (object.partition != null)
                    message.partition = String(object.partition);
                if (object.fidelity != null)
                    message.fidelity = String(object.fidelity);
                if (object.geoLocation != null)
                    message.geoLocation = String(object.geoLocation);
                if (object.contentTypes) {
                    if (!Array.isArray(object.contentTypes))
                        throw TypeError(".dam.v1.View.contentTypes: array expected");
                    message.contentTypes = [];
                    for (var i = 0; i < object.contentTypes.length; ++i)
                        message.contentTypes[i] = String(object.contentTypes[i]);
                }
                if (object.accessRoles) {
                    if (typeof object.accessRoles !== "object")
                        throw TypeError(".dam.v1.View.accessRoles: object expected");
                    message.accessRoles = {};
                    for (var keys = Object.keys(object.accessRoles), i = 0; i < keys.length; ++i) {
                        if (typeof object.accessRoles[keys[i]] !== "object")
                            throw TypeError(".dam.v1.View.accessRoles: object expected");
                        message.accessRoles[keys[i]] = $root.dam.v1.AccessRole.fromObject(object.accessRoles[keys[i]]);
                    }
                }
                if (object.items) {
                    if (!Array.isArray(object.items))
                        throw TypeError(".dam.v1.View.items: array expected");
                    message.items = [];
                    for (var i = 0; i < object.items.length; ++i) {
                        if (typeof object.items[i] !== "object")
                            throw TypeError(".dam.v1.View.items: object expected");
                        message.items[i] = $root.dam.v1.View.Item.fromObject(object.items[i]);
                    }
                }
                if (object.aud != null)
                    message.aud = String(object.aud);
                if (object.defaultRole != null)
                    message.defaultRole = String(object.defaultRole);
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.View.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                if (object.computedInterfaces) {
                    if (typeof object.computedInterfaces !== "object")
                        throw TypeError(".dam.v1.View.computedInterfaces: object expected");
                    message.computedInterfaces = {};
                    for (var keys = Object.keys(object.computedInterfaces), i = 0; i < keys.length; ++i) {
                        if (typeof object.computedInterfaces[keys[i]] !== "object")
                            throw TypeError(".dam.v1.View.computedInterfaces: object expected");
                        message.computedInterfaces[keys[i]] = $root.dam.v1.View.Interface.fromObject(object.computedInterfaces[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a View message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.View
             * @static
             * @param {dam.v1.View} message View
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            View.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.contentTypes = [];
                    object.items = [];
                }
                if (options.objects || options.defaults) {
                    object.accessRoles = {};
                    object.ui = {};
                    object.computedInterfaces = {};
                }
                if (options.defaults) {
                    object.serviceTemplate = "";
                    object.version = "";
                    object.topic = "";
                    object.partition = "";
                    object.fidelity = "";
                    object.geoLocation = "";
                    object.aud = "";
                    object.defaultRole = "";
                }
                if (message.serviceTemplate != null && message.hasOwnProperty("serviceTemplate"))
                    object.serviceTemplate = message.serviceTemplate;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.topic != null && message.hasOwnProperty("topic"))
                    object.topic = message.topic;
                if (message.partition != null && message.hasOwnProperty("partition"))
                    object.partition = message.partition;
                if (message.fidelity != null && message.hasOwnProperty("fidelity"))
                    object.fidelity = message.fidelity;
                if (message.geoLocation != null && message.hasOwnProperty("geoLocation"))
                    object.geoLocation = message.geoLocation;
                if (message.contentTypes && message.contentTypes.length) {
                    object.contentTypes = [];
                    for (var j = 0; j < message.contentTypes.length; ++j)
                        object.contentTypes[j] = message.contentTypes[j];
                }
                var keys2;
                if (message.accessRoles && (keys2 = Object.keys(message.accessRoles)).length) {
                    object.accessRoles = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.accessRoles[keys2[j]] = $root.dam.v1.AccessRole.toObject(message.accessRoles[keys2[j]], options);
                }
                if (message.items && message.items.length) {
                    object.items = [];
                    for (var j = 0; j < message.items.length; ++j)
                        object.items[j] = $root.dam.v1.View.Item.toObject(message.items[j], options);
                }
                if (message.aud != null && message.hasOwnProperty("aud"))
                    object.aud = message.aud;
                if (message.defaultRole != null && message.hasOwnProperty("defaultRole"))
                    object.defaultRole = message.defaultRole;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                if (message.computedInterfaces && (keys2 = Object.keys(message.computedInterfaces)).length) {
                    object.computedInterfaces = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.computedInterfaces[keys2[j]] = $root.dam.v1.View.Interface.toObject(message.computedInterfaces[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this View to JSON.
             * @function toJSON
             * @memberof dam.v1.View
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            View.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            View.Interface = (function() {

                /**
                 * Properties of an Interface.
                 * @memberof dam.v1.View
                 * @interface IInterface
                 * @property {Array.<string>|null} [uri] Interface uri
                 */

                /**
                 * Constructs a new Interface.
                 * @memberof dam.v1.View
                 * @classdesc Represents an Interface.
                 * @implements IInterface
                 * @constructor
                 * @param {dam.v1.View.IInterface=} [properties] Properties to set
                 */
                function Interface(properties) {
                    this.uri = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Interface uri.
                 * @member {Array.<string>} uri
                 * @memberof dam.v1.View.Interface
                 * @instance
                 */
                Interface.prototype.uri = $util.emptyArray;

                /**
                 * Creates a new Interface instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {dam.v1.View.IInterface=} [properties] Properties to set
                 * @returns {dam.v1.View.Interface} Interface instance
                 */
                Interface.create = function create(properties) {
                    return new Interface(properties);
                };

                /**
                 * Encodes the specified Interface message. Does not implicitly {@link dam.v1.View.Interface.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {dam.v1.View.IInterface} message Interface message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Interface.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.uri != null && message.uri.length)
                        for (var i = 0; i < message.uri.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Interface message, length delimited. Does not implicitly {@link dam.v1.View.Interface.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {dam.v1.View.IInterface} message Interface message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Interface.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Interface message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.View.Interface} Interface
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Interface.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.View.Interface();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.uri && message.uri.length))
                                message.uri = [];
                            message.uri.push(reader.string());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Interface message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.View.Interface} Interface
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Interface.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Interface message.
                 * @function verify
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Interface.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.uri != null && message.hasOwnProperty("uri")) {
                        if (!Array.isArray(message.uri))
                            return "uri: array expected";
                        for (var i = 0; i < message.uri.length; ++i)
                            if (!$util.isString(message.uri[i]))
                                return "uri: string[] expected";
                    }
                    return null;
                };

                /**
                 * Creates an Interface message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.View.Interface} Interface
                 */
                Interface.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.View.Interface)
                        return object;
                    var message = new $root.dam.v1.View.Interface();
                    if (object.uri) {
                        if (!Array.isArray(object.uri))
                            throw TypeError(".dam.v1.View.Interface.uri: array expected");
                        message.uri = [];
                        for (var i = 0; i < object.uri.length; ++i)
                            message.uri[i] = String(object.uri[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an Interface message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.View.Interface
                 * @static
                 * @param {dam.v1.View.Interface} message Interface
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Interface.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.uri = [];
                    if (message.uri && message.uri.length) {
                        object.uri = [];
                        for (var j = 0; j < message.uri.length; ++j)
                            object.uri[j] = message.uri[j];
                    }
                    return object;
                };

                /**
                 * Converts this Interface to JSON.
                 * @function toJSON
                 * @memberof dam.v1.View.Interface
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Interface.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Interface;
            })();

            View.Item = (function() {

                /**
                 * Properties of an Item.
                 * @memberof dam.v1.View
                 * @interface IItem
                 * @property {Object.<string,string>|null} [vars] Item vars
                 */

                /**
                 * Constructs a new Item.
                 * @memberof dam.v1.View
                 * @classdesc Represents an Item.
                 * @implements IItem
                 * @constructor
                 * @param {dam.v1.View.IItem=} [properties] Properties to set
                 */
                function Item(properties) {
                    this.vars = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Item vars.
                 * @member {Object.<string,string>} vars
                 * @memberof dam.v1.View.Item
                 * @instance
                 */
                Item.prototype.vars = $util.emptyObject;

                /**
                 * Creates a new Item instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {dam.v1.View.IItem=} [properties] Properties to set
                 * @returns {dam.v1.View.Item} Item instance
                 */
                Item.create = function create(properties) {
                    return new Item(properties);
                };

                /**
                 * Encodes the specified Item message. Does not implicitly {@link dam.v1.View.Item.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {dam.v1.View.IItem} message Item message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Item.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.vars != null && message.hasOwnProperty("vars"))
                        for (var keys = Object.keys(message.vars), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.vars[keys[i]]).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Item message, length delimited. Does not implicitly {@link dam.v1.View.Item.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {dam.v1.View.IItem} message Item message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Item.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Item message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.View.Item} Item
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Item.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.View.Item(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            reader.skip().pos++;
                            if (message.vars === $util.emptyObject)
                                message.vars = {};
                            key = reader.string();
                            reader.pos++;
                            message.vars[key] = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Item message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.View.Item} Item
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Item.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Item message.
                 * @function verify
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Item.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.vars != null && message.hasOwnProperty("vars")) {
                        if (!$util.isObject(message.vars))
                            return "vars: object expected";
                        var key = Object.keys(message.vars);
                        for (var i = 0; i < key.length; ++i)
                            if (!$util.isString(message.vars[key[i]]))
                                return "vars: string{k:string} expected";
                    }
                    return null;
                };

                /**
                 * Creates an Item message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.View.Item} Item
                 */
                Item.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.View.Item)
                        return object;
                    var message = new $root.dam.v1.View.Item();
                    if (object.vars) {
                        if (typeof object.vars !== "object")
                            throw TypeError(".dam.v1.View.Item.vars: object expected");
                        message.vars = {};
                        for (var keys = Object.keys(object.vars), i = 0; i < keys.length; ++i)
                            message.vars[keys[i]] = String(object.vars[keys[i]]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an Item message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.View.Item
                 * @static
                 * @param {dam.v1.View.Item} message Item
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Item.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults)
                        object.vars = {};
                    var keys2;
                    if (message.vars && (keys2 = Object.keys(message.vars)).length) {
                        object.vars = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.vars[keys2[j]] = message.vars[keys2[j]];
                    }
                    return object;
                };

                /**
                 * Converts this Item to JSON.
                 * @function toJSON
                 * @memberof dam.v1.View.Item
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Item.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Item;
            })();

            return View;
        })();

        v1.Resource = (function() {

            /**
             * Properties of a Resource.
             * @memberof dam.v1
             * @interface IResource
             * @property {string|null} [umbrella] Resource umbrella
             * @property {Object.<string,dam.v1.IView>|null} [views] Resource views
             * @property {Array.<string>|null} [clients] Resource clients
             * @property {string|null} [maxTokenTtl] Resource maxTokenTtl
             * @property {Object.<string,string>|null} [ui] Resource ui
             */

            /**
             * Constructs a new Resource.
             * @memberof dam.v1
             * @classdesc Represents a Resource.
             * @implements IResource
             * @constructor
             * @param {dam.v1.IResource=} [properties] Properties to set
             */
            function Resource(properties) {
                this.views = {};
                this.clients = [];
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Resource umbrella.
             * @member {string} umbrella
             * @memberof dam.v1.Resource
             * @instance
             */
            Resource.prototype.umbrella = "";

            /**
             * Resource views.
             * @member {Object.<string,dam.v1.IView>} views
             * @memberof dam.v1.Resource
             * @instance
             */
            Resource.prototype.views = $util.emptyObject;

            /**
             * Resource clients.
             * @member {Array.<string>} clients
             * @memberof dam.v1.Resource
             * @instance
             */
            Resource.prototype.clients = $util.emptyArray;

            /**
             * Resource maxTokenTtl.
             * @member {string} maxTokenTtl
             * @memberof dam.v1.Resource
             * @instance
             */
            Resource.prototype.maxTokenTtl = "";

            /**
             * Resource ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.Resource
             * @instance
             */
            Resource.prototype.ui = $util.emptyObject;

            /**
             * Creates a new Resource instance using the specified properties.
             * @function create
             * @memberof dam.v1.Resource
             * @static
             * @param {dam.v1.IResource=} [properties] Properties to set
             * @returns {dam.v1.Resource} Resource instance
             */
            Resource.create = function create(properties) {
                return new Resource(properties);
            };

            /**
             * Encodes the specified Resource message. Does not implicitly {@link dam.v1.Resource.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.Resource
             * @static
             * @param {dam.v1.IResource} message Resource message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Resource.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.umbrella != null && message.hasOwnProperty("umbrella"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.umbrella);
                if (message.views != null && message.hasOwnProperty("views"))
                    for (var keys = Object.keys(message.views), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.View.encode(message.views[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.clients != null && message.clients.length)
                    for (var i = 0; i < message.clients.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.clients[i]);
                if (message.maxTokenTtl != null && message.hasOwnProperty("maxTokenTtl"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.maxTokenTtl);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Resource message, length delimited. Does not implicitly {@link dam.v1.Resource.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.Resource
             * @static
             * @param {dam.v1.IResource} message Resource message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Resource.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Resource message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.Resource
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.Resource} Resource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Resource.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.Resource(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.umbrella = reader.string();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.views === $util.emptyObject)
                            message.views = {};
                        key = reader.string();
                        reader.pos++;
                        message.views[key] = $root.dam.v1.View.decode(reader, reader.uint32());
                        break;
                    case 3:
                        if (!(message.clients && message.clients.length))
                            message.clients = [];
                        message.clients.push(reader.string());
                        break;
                    case 4:
                        message.maxTokenTtl = reader.string();
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Resource message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.Resource
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.Resource} Resource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Resource.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Resource message.
             * @function verify
             * @memberof dam.v1.Resource
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Resource.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.umbrella != null && message.hasOwnProperty("umbrella"))
                    if (!$util.isString(message.umbrella))
                        return "umbrella: string expected";
                if (message.views != null && message.hasOwnProperty("views")) {
                    if (!$util.isObject(message.views))
                        return "views: object expected";
                    var key = Object.keys(message.views);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.View.verify(message.views[key[i]]);
                        if (error)
                            return "views." + error;
                    }
                }
                if (message.clients != null && message.hasOwnProperty("clients")) {
                    if (!Array.isArray(message.clients))
                        return "clients: array expected";
                    for (var i = 0; i < message.clients.length; ++i)
                        if (!$util.isString(message.clients[i]))
                            return "clients: string[] expected";
                }
                if (message.maxTokenTtl != null && message.hasOwnProperty("maxTokenTtl"))
                    if (!$util.isString(message.maxTokenTtl))
                        return "maxTokenTtl: string expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a Resource message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.Resource
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.Resource} Resource
             */
            Resource.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.Resource)
                    return object;
                var message = new $root.dam.v1.Resource();
                if (object.umbrella != null)
                    message.umbrella = String(object.umbrella);
                if (object.views) {
                    if (typeof object.views !== "object")
                        throw TypeError(".dam.v1.Resource.views: object expected");
                    message.views = {};
                    for (var keys = Object.keys(object.views), i = 0; i < keys.length; ++i) {
                        if (typeof object.views[keys[i]] !== "object")
                            throw TypeError(".dam.v1.Resource.views: object expected");
                        message.views[keys[i]] = $root.dam.v1.View.fromObject(object.views[keys[i]]);
                    }
                }
                if (object.clients) {
                    if (!Array.isArray(object.clients))
                        throw TypeError(".dam.v1.Resource.clients: array expected");
                    message.clients = [];
                    for (var i = 0; i < object.clients.length; ++i)
                        message.clients[i] = String(object.clients[i]);
                }
                if (object.maxTokenTtl != null)
                    message.maxTokenTtl = String(object.maxTokenTtl);
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.Resource.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Resource message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.Resource
             * @static
             * @param {dam.v1.Resource} message Resource
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Resource.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.clients = [];
                if (options.objects || options.defaults) {
                    object.views = {};
                    object.ui = {};
                }
                if (options.defaults) {
                    object.umbrella = "";
                    object.maxTokenTtl = "";
                }
                if (message.umbrella != null && message.hasOwnProperty("umbrella"))
                    object.umbrella = message.umbrella;
                var keys2;
                if (message.views && (keys2 = Object.keys(message.views)).length) {
                    object.views = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.views[keys2[j]] = $root.dam.v1.View.toObject(message.views[keys2[j]], options);
                }
                if (message.clients && message.clients.length) {
                    object.clients = [];
                    for (var j = 0; j < message.clients.length; ++j)
                        object.clients[j] = message.clients[j];
                }
                if (message.maxTokenTtl != null && message.hasOwnProperty("maxTokenTtl"))
                    object.maxTokenTtl = message.maxTokenTtl;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this Resource to JSON.
             * @function toJSON
             * @memberof dam.v1.Resource
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Resource.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Resource;
        })();

        v1.Client = (function() {

            /**
             * Properties of a Client.
             * @memberof dam.v1
             * @interface IClient
             * @property {string|null} [clientId] Client clientId
             * @property {number|Long|null} [revision] Client revision
             * @property {number|null} [commitTime] Client commitTime
             * @property {Object.<string,string>|null} [ui] Client ui
             */

            /**
             * Constructs a new Client.
             * @memberof dam.v1
             * @classdesc Represents a Client.
             * @implements IClient
             * @constructor
             * @param {dam.v1.IClient=} [properties] Properties to set
             */
            function Client(properties) {
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Client clientId.
             * @member {string} clientId
             * @memberof dam.v1.Client
             * @instance
             */
            Client.prototype.clientId = "";

            /**
             * Client revision.
             * @member {number|Long} revision
             * @memberof dam.v1.Client
             * @instance
             */
            Client.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Client commitTime.
             * @member {number} commitTime
             * @memberof dam.v1.Client
             * @instance
             */
            Client.prototype.commitTime = 0;

            /**
             * Client ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.Client
             * @instance
             */
            Client.prototype.ui = $util.emptyObject;

            /**
             * Creates a new Client instance using the specified properties.
             * @function create
             * @memberof dam.v1.Client
             * @static
             * @param {dam.v1.IClient=} [properties] Properties to set
             * @returns {dam.v1.Client} Client instance
             */
            Client.create = function create(properties) {
                return new Client(properties);
            };

            /**
             * Encodes the specified Client message. Does not implicitly {@link dam.v1.Client.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.Client
             * @static
             * @param {dam.v1.IClient} message Client message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Client.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientId);
                if (message.revision != null && message.hasOwnProperty("revision"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.commitTime);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Client message, length delimited. Does not implicitly {@link dam.v1.Client.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.Client
             * @static
             * @param {dam.v1.IClient} message Client message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Client.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Client message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.Client
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.Client} Client
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Client.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.Client(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.clientId = reader.string();
                        break;
                    case 2:
                        message.revision = reader.int64();
                        break;
                    case 3:
                        message.commitTime = reader.double();
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Client message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.Client
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.Client} Client
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Client.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Client message.
             * @function verify
             * @memberof dam.v1.Client
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Client.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    if (!$util.isString(message.clientId))
                        return "clientId: string expected";
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                        return "revision: integer|Long expected";
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    if (typeof message.commitTime !== "number")
                        return "commitTime: number expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a Client message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.Client
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.Client} Client
             */
            Client.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.Client)
                    return object;
                var message = new $root.dam.v1.Client();
                if (object.clientId != null)
                    message.clientId = String(object.clientId);
                if (object.revision != null)
                    if ($util.Long)
                        (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                    else if (typeof object.revision === "string")
                        message.revision = parseInt(object.revision, 10);
                    else if (typeof object.revision === "number")
                        message.revision = object.revision;
                    else if (typeof object.revision === "object")
                        message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
                if (object.commitTime != null)
                    message.commitTime = Number(object.commitTime);
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.Client.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Client message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.Client
             * @static
             * @param {dam.v1.Client} message Client
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Client.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ui = {};
                if (options.defaults) {
                    object.clientId = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.revision = options.longs === String ? "0" : 0;
                    object.commitTime = 0;
                }
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    object.clientId = message.clientId;
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (typeof message.revision === "number")
                        object.revision = options.longs === String ? String(message.revision) : message.revision;
                    else
                        object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    object.commitTime = options.json && !isFinite(message.commitTime) ? String(message.commitTime) : message.commitTime;
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this Client to JSON.
             * @function toJSON
             * @memberof dam.v1.Client
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Client.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Client;
        })();

        v1.ServiceTemplate = (function() {

            /**
             * Properties of a ServiceTemplate.
             * @memberof dam.v1
             * @interface IServiceTemplate
             * @property {string|null} [targetAdapter] ServiceTemplate targetAdapter
             * @property {string|null} [itemFormat] ServiceTemplate itemFormat
             * @property {Object.<string,string>|null} [interfaces] ServiceTemplate interfaces
             * @property {Object.<string,dam.v1.IServiceRole>|null} [serviceRoles] ServiceTemplate serviceRoles
             * @property {Object.<string,string>|null} [ui] ServiceTemplate ui
             */

            /**
             * Constructs a new ServiceTemplate.
             * @memberof dam.v1
             * @classdesc Represents a ServiceTemplate.
             * @implements IServiceTemplate
             * @constructor
             * @param {dam.v1.IServiceTemplate=} [properties] Properties to set
             */
            function ServiceTemplate(properties) {
                this.interfaces = {};
                this.serviceRoles = {};
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServiceTemplate targetAdapter.
             * @member {string} targetAdapter
             * @memberof dam.v1.ServiceTemplate
             * @instance
             */
            ServiceTemplate.prototype.targetAdapter = "";

            /**
             * ServiceTemplate itemFormat.
             * @member {string} itemFormat
             * @memberof dam.v1.ServiceTemplate
             * @instance
             */
            ServiceTemplate.prototype.itemFormat = "";

            /**
             * ServiceTemplate interfaces.
             * @member {Object.<string,string>} interfaces
             * @memberof dam.v1.ServiceTemplate
             * @instance
             */
            ServiceTemplate.prototype.interfaces = $util.emptyObject;

            /**
             * ServiceTemplate serviceRoles.
             * @member {Object.<string,dam.v1.IServiceRole>} serviceRoles
             * @memberof dam.v1.ServiceTemplate
             * @instance
             */
            ServiceTemplate.prototype.serviceRoles = $util.emptyObject;

            /**
             * ServiceTemplate ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.ServiceTemplate
             * @instance
             */
            ServiceTemplate.prototype.ui = $util.emptyObject;

            /**
             * Creates a new ServiceTemplate instance using the specified properties.
             * @function create
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {dam.v1.IServiceTemplate=} [properties] Properties to set
             * @returns {dam.v1.ServiceTemplate} ServiceTemplate instance
             */
            ServiceTemplate.create = function create(properties) {
                return new ServiceTemplate(properties);
            };

            /**
             * Encodes the specified ServiceTemplate message. Does not implicitly {@link dam.v1.ServiceTemplate.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {dam.v1.IServiceTemplate} message ServiceTemplate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceTemplate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.targetAdapter != null && message.hasOwnProperty("targetAdapter"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.targetAdapter);
                if (message.itemFormat != null && message.hasOwnProperty("itemFormat"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.itemFormat);
                if (message.interfaces != null && message.hasOwnProperty("interfaces"))
                    for (var keys = Object.keys(message.interfaces), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.interfaces[keys[i]]).ldelim();
                if (message.serviceRoles != null && message.hasOwnProperty("serviceRoles"))
                    for (var keys = Object.keys(message.serviceRoles), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.ServiceRole.encode(message.serviceRoles[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ServiceTemplate message, length delimited. Does not implicitly {@link dam.v1.ServiceTemplate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {dam.v1.IServiceTemplate} message ServiceTemplate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceTemplate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServiceTemplate message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ServiceTemplate} ServiceTemplate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceTemplate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ServiceTemplate(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.targetAdapter = reader.string();
                        break;
                    case 2:
                        message.itemFormat = reader.string();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.interfaces === $util.emptyObject)
                            message.interfaces = {};
                        key = reader.string();
                        reader.pos++;
                        message.interfaces[key] = reader.string();
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.serviceRoles === $util.emptyObject)
                            message.serviceRoles = {};
                        key = reader.string();
                        reader.pos++;
                        message.serviceRoles[key] = $root.dam.v1.ServiceRole.decode(reader, reader.uint32());
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServiceTemplate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ServiceTemplate} ServiceTemplate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceTemplate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServiceTemplate message.
             * @function verify
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServiceTemplate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.targetAdapter != null && message.hasOwnProperty("targetAdapter"))
                    if (!$util.isString(message.targetAdapter))
                        return "targetAdapter: string expected";
                if (message.itemFormat != null && message.hasOwnProperty("itemFormat"))
                    if (!$util.isString(message.itemFormat))
                        return "itemFormat: string expected";
                if (message.interfaces != null && message.hasOwnProperty("interfaces")) {
                    if (!$util.isObject(message.interfaces))
                        return "interfaces: object expected";
                    var key = Object.keys(message.interfaces);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.interfaces[key[i]]))
                            return "interfaces: string{k:string} expected";
                }
                if (message.serviceRoles != null && message.hasOwnProperty("serviceRoles")) {
                    if (!$util.isObject(message.serviceRoles))
                        return "serviceRoles: object expected";
                    var key = Object.keys(message.serviceRoles);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.ServiceRole.verify(message.serviceRoles[key[i]]);
                        if (error)
                            return "serviceRoles." + error;
                    }
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a ServiceTemplate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ServiceTemplate} ServiceTemplate
             */
            ServiceTemplate.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ServiceTemplate)
                    return object;
                var message = new $root.dam.v1.ServiceTemplate();
                if (object.targetAdapter != null)
                    message.targetAdapter = String(object.targetAdapter);
                if (object.itemFormat != null)
                    message.itemFormat = String(object.itemFormat);
                if (object.interfaces) {
                    if (typeof object.interfaces !== "object")
                        throw TypeError(".dam.v1.ServiceTemplate.interfaces: object expected");
                    message.interfaces = {};
                    for (var keys = Object.keys(object.interfaces), i = 0; i < keys.length; ++i)
                        message.interfaces[keys[i]] = String(object.interfaces[keys[i]]);
                }
                if (object.serviceRoles) {
                    if (typeof object.serviceRoles !== "object")
                        throw TypeError(".dam.v1.ServiceTemplate.serviceRoles: object expected");
                    message.serviceRoles = {};
                    for (var keys = Object.keys(object.serviceRoles), i = 0; i < keys.length; ++i) {
                        if (typeof object.serviceRoles[keys[i]] !== "object")
                            throw TypeError(".dam.v1.ServiceTemplate.serviceRoles: object expected");
                        message.serviceRoles[keys[i]] = $root.dam.v1.ServiceRole.fromObject(object.serviceRoles[keys[i]]);
                    }
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.ServiceTemplate.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServiceTemplate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ServiceTemplate
             * @static
             * @param {dam.v1.ServiceTemplate} message ServiceTemplate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServiceTemplate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.interfaces = {};
                    object.serviceRoles = {};
                    object.ui = {};
                }
                if (options.defaults) {
                    object.targetAdapter = "";
                    object.itemFormat = "";
                }
                if (message.targetAdapter != null && message.hasOwnProperty("targetAdapter"))
                    object.targetAdapter = message.targetAdapter;
                if (message.itemFormat != null && message.hasOwnProperty("itemFormat"))
                    object.itemFormat = message.itemFormat;
                var keys2;
                if (message.interfaces && (keys2 = Object.keys(message.interfaces)).length) {
                    object.interfaces = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.interfaces[keys2[j]] = message.interfaces[keys2[j]];
                }
                if (message.serviceRoles && (keys2 = Object.keys(message.serviceRoles)).length) {
                    object.serviceRoles = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.serviceRoles[keys2[j]] = $root.dam.v1.ServiceRole.toObject(message.serviceRoles[keys2[j]], options);
                }
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this ServiceTemplate to JSON.
             * @function toJSON
             * @memberof dam.v1.ServiceTemplate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServiceTemplate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ServiceTemplate;
        })();

        v1.ServiceRole = (function() {

            /**
             * Properties of a ServiceRole.
             * @memberof dam.v1
             * @interface IServiceRole
             * @property {Array.<string>|null} [targetRoles] ServiceRole targetRoles
             * @property {Array.<string>|null} [targetScopes] ServiceRole targetScopes
             * @property {Array.<string>|null} [damRoleCategories] ServiceRole damRoleCategories
             * @property {Object.<string,string>|null} [ui] ServiceRole ui
             */

            /**
             * Constructs a new ServiceRole.
             * @memberof dam.v1
             * @classdesc Represents a ServiceRole.
             * @implements IServiceRole
             * @constructor
             * @param {dam.v1.IServiceRole=} [properties] Properties to set
             */
            function ServiceRole(properties) {
                this.targetRoles = [];
                this.targetScopes = [];
                this.damRoleCategories = [];
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServiceRole targetRoles.
             * @member {Array.<string>} targetRoles
             * @memberof dam.v1.ServiceRole
             * @instance
             */
            ServiceRole.prototype.targetRoles = $util.emptyArray;

            /**
             * ServiceRole targetScopes.
             * @member {Array.<string>} targetScopes
             * @memberof dam.v1.ServiceRole
             * @instance
             */
            ServiceRole.prototype.targetScopes = $util.emptyArray;

            /**
             * ServiceRole damRoleCategories.
             * @member {Array.<string>} damRoleCategories
             * @memberof dam.v1.ServiceRole
             * @instance
             */
            ServiceRole.prototype.damRoleCategories = $util.emptyArray;

            /**
             * ServiceRole ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.ServiceRole
             * @instance
             */
            ServiceRole.prototype.ui = $util.emptyObject;

            /**
             * Creates a new ServiceRole instance using the specified properties.
             * @function create
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {dam.v1.IServiceRole=} [properties] Properties to set
             * @returns {dam.v1.ServiceRole} ServiceRole instance
             */
            ServiceRole.create = function create(properties) {
                return new ServiceRole(properties);
            };

            /**
             * Encodes the specified ServiceRole message. Does not implicitly {@link dam.v1.ServiceRole.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {dam.v1.IServiceRole} message ServiceRole message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceRole.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.targetRoles != null && message.targetRoles.length)
                    for (var i = 0; i < message.targetRoles.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.targetRoles[i]);
                if (message.targetScopes != null && message.targetScopes.length)
                    for (var i = 0; i < message.targetScopes.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.targetScopes[i]);
                if (message.damRoleCategories != null && message.damRoleCategories.length)
                    for (var i = 0; i < message.damRoleCategories.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.damRoleCategories[i]);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ServiceRole message, length delimited. Does not implicitly {@link dam.v1.ServiceRole.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {dam.v1.IServiceRole} message ServiceRole message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceRole.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServiceRole message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ServiceRole} ServiceRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceRole.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ServiceRole(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.targetRoles && message.targetRoles.length))
                            message.targetRoles = [];
                        message.targetRoles.push(reader.string());
                        break;
                    case 2:
                        if (!(message.targetScopes && message.targetScopes.length))
                            message.targetScopes = [];
                        message.targetScopes.push(reader.string());
                        break;
                    case 3:
                        if (!(message.damRoleCategories && message.damRoleCategories.length))
                            message.damRoleCategories = [];
                        message.damRoleCategories.push(reader.string());
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServiceRole message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ServiceRole} ServiceRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceRole.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServiceRole message.
             * @function verify
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServiceRole.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.targetRoles != null && message.hasOwnProperty("targetRoles")) {
                    if (!Array.isArray(message.targetRoles))
                        return "targetRoles: array expected";
                    for (var i = 0; i < message.targetRoles.length; ++i)
                        if (!$util.isString(message.targetRoles[i]))
                            return "targetRoles: string[] expected";
                }
                if (message.targetScopes != null && message.hasOwnProperty("targetScopes")) {
                    if (!Array.isArray(message.targetScopes))
                        return "targetScopes: array expected";
                    for (var i = 0; i < message.targetScopes.length; ++i)
                        if (!$util.isString(message.targetScopes[i]))
                            return "targetScopes: string[] expected";
                }
                if (message.damRoleCategories != null && message.hasOwnProperty("damRoleCategories")) {
                    if (!Array.isArray(message.damRoleCategories))
                        return "damRoleCategories: array expected";
                    for (var i = 0; i < message.damRoleCategories.length; ++i)
                        if (!$util.isString(message.damRoleCategories[i]))
                            return "damRoleCategories: string[] expected";
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a ServiceRole message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ServiceRole} ServiceRole
             */
            ServiceRole.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ServiceRole)
                    return object;
                var message = new $root.dam.v1.ServiceRole();
                if (object.targetRoles) {
                    if (!Array.isArray(object.targetRoles))
                        throw TypeError(".dam.v1.ServiceRole.targetRoles: array expected");
                    message.targetRoles = [];
                    for (var i = 0; i < object.targetRoles.length; ++i)
                        message.targetRoles[i] = String(object.targetRoles[i]);
                }
                if (object.targetScopes) {
                    if (!Array.isArray(object.targetScopes))
                        throw TypeError(".dam.v1.ServiceRole.targetScopes: array expected");
                    message.targetScopes = [];
                    for (var i = 0; i < object.targetScopes.length; ++i)
                        message.targetScopes[i] = String(object.targetScopes[i]);
                }
                if (object.damRoleCategories) {
                    if (!Array.isArray(object.damRoleCategories))
                        throw TypeError(".dam.v1.ServiceRole.damRoleCategories: array expected");
                    message.damRoleCategories = [];
                    for (var i = 0; i < object.damRoleCategories.length; ++i)
                        message.damRoleCategories[i] = String(object.damRoleCategories[i]);
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.ServiceRole.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServiceRole message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ServiceRole
             * @static
             * @param {dam.v1.ServiceRole} message ServiceRole
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServiceRole.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.targetRoles = [];
                    object.targetScopes = [];
                    object.damRoleCategories = [];
                }
                if (options.objects || options.defaults)
                    object.ui = {};
                if (message.targetRoles && message.targetRoles.length) {
                    object.targetRoles = [];
                    for (var j = 0; j < message.targetRoles.length; ++j)
                        object.targetRoles[j] = message.targetRoles[j];
                }
                if (message.targetScopes && message.targetScopes.length) {
                    object.targetScopes = [];
                    for (var j = 0; j < message.targetScopes.length; ++j)
                        object.targetScopes[j] = message.targetScopes[j];
                }
                if (message.damRoleCategories && message.damRoleCategories.length) {
                    object.damRoleCategories = [];
                    for (var j = 0; j < message.damRoleCategories.length; ++j)
                        object.damRoleCategories[j] = message.damRoleCategories[j];
                }
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this ServiceRole to JSON.
             * @function toJSON
             * @memberof dam.v1.ServiceRole
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServiceRole.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ServiceRole;
        })();

        v1.AccessRole = (function() {

            /**
             * Properties of an AccessRole.
             * @memberof dam.v1
             * @interface IAccessRole
             * @property {Array.<string>|null} [policies] AccessRole policies
             * @property {Object.<string,string>|null} [ui] AccessRole ui
             * @property {Array.<dam.v1.IPolicyBasis>|null} [computedPolicyBasis] AccessRole computedPolicyBasis
             */

            /**
             * Constructs a new AccessRole.
             * @memberof dam.v1
             * @classdesc Represents an AccessRole.
             * @implements IAccessRole
             * @constructor
             * @param {dam.v1.IAccessRole=} [properties] Properties to set
             */
            function AccessRole(properties) {
                this.policies = [];
                this.ui = {};
                this.computedPolicyBasis = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AccessRole policies.
             * @member {Array.<string>} policies
             * @memberof dam.v1.AccessRole
             * @instance
             */
            AccessRole.prototype.policies = $util.emptyArray;

            /**
             * AccessRole ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.AccessRole
             * @instance
             */
            AccessRole.prototype.ui = $util.emptyObject;

            /**
             * AccessRole computedPolicyBasis.
             * @member {Array.<dam.v1.IPolicyBasis>} computedPolicyBasis
             * @memberof dam.v1.AccessRole
             * @instance
             */
            AccessRole.prototype.computedPolicyBasis = $util.emptyArray;

            /**
             * Creates a new AccessRole instance using the specified properties.
             * @function create
             * @memberof dam.v1.AccessRole
             * @static
             * @param {dam.v1.IAccessRole=} [properties] Properties to set
             * @returns {dam.v1.AccessRole} AccessRole instance
             */
            AccessRole.create = function create(properties) {
                return new AccessRole(properties);
            };

            /**
             * Encodes the specified AccessRole message. Does not implicitly {@link dam.v1.AccessRole.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.AccessRole
             * @static
             * @param {dam.v1.IAccessRole} message AccessRole message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessRole.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.policies != null && message.policies.length)
                    for (var i = 0; i < message.policies.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.policies[i]);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                if (message.computedPolicyBasis != null && message.computedPolicyBasis.length)
                    for (var i = 0; i < message.computedPolicyBasis.length; ++i)
                        $root.dam.v1.PolicyBasis.encode(message.computedPolicyBasis[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AccessRole message, length delimited. Does not implicitly {@link dam.v1.AccessRole.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.AccessRole
             * @static
             * @param {dam.v1.IAccessRole} message AccessRole message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessRole.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AccessRole message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.AccessRole
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.AccessRole} AccessRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessRole.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.AccessRole(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.policies && message.policies.length))
                            message.policies = [];
                        message.policies.push(reader.string());
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    case 3:
                        if (!(message.computedPolicyBasis && message.computedPolicyBasis.length))
                            message.computedPolicyBasis = [];
                        message.computedPolicyBasis.push($root.dam.v1.PolicyBasis.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AccessRole message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.AccessRole
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.AccessRole} AccessRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessRole.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AccessRole message.
             * @function verify
             * @memberof dam.v1.AccessRole
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AccessRole.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.policies != null && message.hasOwnProperty("policies")) {
                    if (!Array.isArray(message.policies))
                        return "policies: array expected";
                    for (var i = 0; i < message.policies.length; ++i)
                        if (!$util.isString(message.policies[i]))
                            return "policies: string[] expected";
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                if (message.computedPolicyBasis != null && message.hasOwnProperty("computedPolicyBasis")) {
                    if (!Array.isArray(message.computedPolicyBasis))
                        return "computedPolicyBasis: array expected";
                    for (var i = 0; i < message.computedPolicyBasis.length; ++i) {
                        var error = $root.dam.v1.PolicyBasis.verify(message.computedPolicyBasis[i]);
                        if (error)
                            return "computedPolicyBasis." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an AccessRole message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.AccessRole
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.AccessRole} AccessRole
             */
            AccessRole.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.AccessRole)
                    return object;
                var message = new $root.dam.v1.AccessRole();
                if (object.policies) {
                    if (!Array.isArray(object.policies))
                        throw TypeError(".dam.v1.AccessRole.policies: array expected");
                    message.policies = [];
                    for (var i = 0; i < object.policies.length; ++i)
                        message.policies[i] = String(object.policies[i]);
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.AccessRole.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                if (object.computedPolicyBasis) {
                    if (!Array.isArray(object.computedPolicyBasis))
                        throw TypeError(".dam.v1.AccessRole.computedPolicyBasis: array expected");
                    message.computedPolicyBasis = [];
                    for (var i = 0; i < object.computedPolicyBasis.length; ++i) {
                        if (typeof object.computedPolicyBasis[i] !== "object")
                            throw TypeError(".dam.v1.AccessRole.computedPolicyBasis: object expected");
                        message.computedPolicyBasis[i] = $root.dam.v1.PolicyBasis.fromObject(object.computedPolicyBasis[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an AccessRole message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.AccessRole
             * @static
             * @param {dam.v1.AccessRole} message AccessRole
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AccessRole.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.policies = [];
                    object.computedPolicyBasis = [];
                }
                if (options.objects || options.defaults)
                    object.ui = {};
                if (message.policies && message.policies.length) {
                    object.policies = [];
                    for (var j = 0; j < message.policies.length; ++j)
                        object.policies[j] = message.policies[j];
                }
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                if (message.computedPolicyBasis && message.computedPolicyBasis.length) {
                    object.computedPolicyBasis = [];
                    for (var j = 0; j < message.computedPolicyBasis.length; ++j)
                        object.computedPolicyBasis[j] = $root.dam.v1.PolicyBasis.toObject(message.computedPolicyBasis[j], options);
                }
                return object;
            };

            /**
             * Converts this AccessRole to JSON.
             * @function toJSON
             * @memberof dam.v1.AccessRole
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AccessRole.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AccessRole;
        })();

        v1.ConfigOptions = (function() {

            /**
             * Properties of a ConfigOptions.
             * @memberof dam.v1
             * @interface IConfigOptions
             * @property {boolean|null} [readOnlyMasterRealm] ConfigOptions readOnlyMasterRealm
             * @property {Array.<string>|null} [whitelistedRealms] ConfigOptions whitelistedRealms
             * @property {string|null} [gcpManagedKeysMaxRequestedTtl] ConfigOptions gcpManagedKeysMaxRequestedTtl
             * @property {number|null} [gcpManagedKeysPerAccount] ConfigOptions gcpManagedKeysPerAccount
             * @property {string|null} [gcpServiceAccountProject] ConfigOptions gcpServiceAccountProject
             * @property {Object.<string,dam.v1.ConfigOptions.IDescriptor>|null} [computedDescriptors] ConfigOptions computedDescriptors
             */

            /**
             * Constructs a new ConfigOptions.
             * @memberof dam.v1
             * @classdesc Represents a ConfigOptions.
             * @implements IConfigOptions
             * @constructor
             * @param {dam.v1.IConfigOptions=} [properties] Properties to set
             */
            function ConfigOptions(properties) {
                this.whitelistedRealms = [];
                this.computedDescriptors = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigOptions readOnlyMasterRealm.
             * @member {boolean} readOnlyMasterRealm
             * @memberof dam.v1.ConfigOptions
             * @instance
             */
            ConfigOptions.prototype.readOnlyMasterRealm = false;

            /**
             * ConfigOptions whitelistedRealms.
             * @member {Array.<string>} whitelistedRealms
             * @memberof dam.v1.ConfigOptions
             * @instance
             */
            ConfigOptions.prototype.whitelistedRealms = $util.emptyArray;

            /**
             * ConfigOptions gcpManagedKeysMaxRequestedTtl.
             * @member {string} gcpManagedKeysMaxRequestedTtl
             * @memberof dam.v1.ConfigOptions
             * @instance
             */
            ConfigOptions.prototype.gcpManagedKeysMaxRequestedTtl = "";

            /**
             * ConfigOptions gcpManagedKeysPerAccount.
             * @member {number} gcpManagedKeysPerAccount
             * @memberof dam.v1.ConfigOptions
             * @instance
             */
            ConfigOptions.prototype.gcpManagedKeysPerAccount = 0;

            /**
             * ConfigOptions gcpServiceAccountProject.
             * @member {string} gcpServiceAccountProject
             * @memberof dam.v1.ConfigOptions
             * @instance
             */
            ConfigOptions.prototype.gcpServiceAccountProject = "";

            /**
             * ConfigOptions computedDescriptors.
             * @member {Object.<string,dam.v1.ConfigOptions.IDescriptor>} computedDescriptors
             * @memberof dam.v1.ConfigOptions
             * @instance
             */
            ConfigOptions.prototype.computedDescriptors = $util.emptyObject;

            /**
             * Creates a new ConfigOptions instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {dam.v1.IConfigOptions=} [properties] Properties to set
             * @returns {dam.v1.ConfigOptions} ConfigOptions instance
             */
            ConfigOptions.create = function create(properties) {
                return new ConfigOptions(properties);
            };

            /**
             * Encodes the specified ConfigOptions message. Does not implicitly {@link dam.v1.ConfigOptions.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {dam.v1.IConfigOptions} message ConfigOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigOptions.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.readOnlyMasterRealm != null && message.hasOwnProperty("readOnlyMasterRealm"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.readOnlyMasterRealm);
                if (message.whitelistedRealms != null && message.whitelistedRealms.length)
                    for (var i = 0; i < message.whitelistedRealms.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.whitelistedRealms[i]);
                if (message.gcpManagedKeysMaxRequestedTtl != null && message.hasOwnProperty("gcpManagedKeysMaxRequestedTtl"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.gcpManagedKeysMaxRequestedTtl);
                if (message.gcpManagedKeysPerAccount != null && message.hasOwnProperty("gcpManagedKeysPerAccount"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.gcpManagedKeysPerAccount);
                if (message.gcpServiceAccountProject != null && message.hasOwnProperty("gcpServiceAccountProject"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.gcpServiceAccountProject);
                if (message.computedDescriptors != null && message.hasOwnProperty("computedDescriptors"))
                    for (var keys = Object.keys(message.computedDescriptors), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.ConfigOptions.Descriptor.encode(message.computedDescriptors[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified ConfigOptions message, length delimited. Does not implicitly {@link dam.v1.ConfigOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {dam.v1.IConfigOptions} message ConfigOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigOptions message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigOptions} ConfigOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigOptions(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.readOnlyMasterRealm = reader.bool();
                        break;
                    case 2:
                        if (!(message.whitelistedRealms && message.whitelistedRealms.length))
                            message.whitelistedRealms = [];
                        message.whitelistedRealms.push(reader.string());
                        break;
                    case 3:
                        message.gcpManagedKeysMaxRequestedTtl = reader.string();
                        break;
                    case 4:
                        message.gcpManagedKeysPerAccount = reader.int32();
                        break;
                    case 5:
                        message.gcpServiceAccountProject = reader.string();
                        break;
                    case 6:
                        reader.skip().pos++;
                        if (message.computedDescriptors === $util.emptyObject)
                            message.computedDescriptors = {};
                        key = reader.string();
                        reader.pos++;
                        message.computedDescriptors[key] = $root.dam.v1.ConfigOptions.Descriptor.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigOptions} ConfigOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigOptions message.
             * @function verify
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigOptions.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.readOnlyMasterRealm != null && message.hasOwnProperty("readOnlyMasterRealm"))
                    if (typeof message.readOnlyMasterRealm !== "boolean")
                        return "readOnlyMasterRealm: boolean expected";
                if (message.whitelistedRealms != null && message.hasOwnProperty("whitelistedRealms")) {
                    if (!Array.isArray(message.whitelistedRealms))
                        return "whitelistedRealms: array expected";
                    for (var i = 0; i < message.whitelistedRealms.length; ++i)
                        if (!$util.isString(message.whitelistedRealms[i]))
                            return "whitelistedRealms: string[] expected";
                }
                if (message.gcpManagedKeysMaxRequestedTtl != null && message.hasOwnProperty("gcpManagedKeysMaxRequestedTtl"))
                    if (!$util.isString(message.gcpManagedKeysMaxRequestedTtl))
                        return "gcpManagedKeysMaxRequestedTtl: string expected";
                if (message.gcpManagedKeysPerAccount != null && message.hasOwnProperty("gcpManagedKeysPerAccount"))
                    if (!$util.isInteger(message.gcpManagedKeysPerAccount))
                        return "gcpManagedKeysPerAccount: integer expected";
                if (message.gcpServiceAccountProject != null && message.hasOwnProperty("gcpServiceAccountProject"))
                    if (!$util.isString(message.gcpServiceAccountProject))
                        return "gcpServiceAccountProject: string expected";
                if (message.computedDescriptors != null && message.hasOwnProperty("computedDescriptors")) {
                    if (!$util.isObject(message.computedDescriptors))
                        return "computedDescriptors: object expected";
                    var key = Object.keys(message.computedDescriptors);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.ConfigOptions.Descriptor.verify(message.computedDescriptors[key[i]]);
                        if (error)
                            return "computedDescriptors." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ConfigOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigOptions} ConfigOptions
             */
            ConfigOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigOptions)
                    return object;
                var message = new $root.dam.v1.ConfigOptions();
                if (object.readOnlyMasterRealm != null)
                    message.readOnlyMasterRealm = Boolean(object.readOnlyMasterRealm);
                if (object.whitelistedRealms) {
                    if (!Array.isArray(object.whitelistedRealms))
                        throw TypeError(".dam.v1.ConfigOptions.whitelistedRealms: array expected");
                    message.whitelistedRealms = [];
                    for (var i = 0; i < object.whitelistedRealms.length; ++i)
                        message.whitelistedRealms[i] = String(object.whitelistedRealms[i]);
                }
                if (object.gcpManagedKeysMaxRequestedTtl != null)
                    message.gcpManagedKeysMaxRequestedTtl = String(object.gcpManagedKeysMaxRequestedTtl);
                if (object.gcpManagedKeysPerAccount != null)
                    message.gcpManagedKeysPerAccount = object.gcpManagedKeysPerAccount | 0;
                if (object.gcpServiceAccountProject != null)
                    message.gcpServiceAccountProject = String(object.gcpServiceAccountProject);
                if (object.computedDescriptors) {
                    if (typeof object.computedDescriptors !== "object")
                        throw TypeError(".dam.v1.ConfigOptions.computedDescriptors: object expected");
                    message.computedDescriptors = {};
                    for (var keys = Object.keys(object.computedDescriptors), i = 0; i < keys.length; ++i) {
                        if (typeof object.computedDescriptors[keys[i]] !== "object")
                            throw TypeError(".dam.v1.ConfigOptions.computedDescriptors: object expected");
                        message.computedDescriptors[keys[i]] = $root.dam.v1.ConfigOptions.Descriptor.fromObject(object.computedDescriptors[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigOptions
             * @static
             * @param {dam.v1.ConfigOptions} message ConfigOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.whitelistedRealms = [];
                if (options.objects || options.defaults)
                    object.computedDescriptors = {};
                if (options.defaults) {
                    object.readOnlyMasterRealm = false;
                    object.gcpManagedKeysMaxRequestedTtl = "";
                    object.gcpManagedKeysPerAccount = 0;
                    object.gcpServiceAccountProject = "";
                }
                if (message.readOnlyMasterRealm != null && message.hasOwnProperty("readOnlyMasterRealm"))
                    object.readOnlyMasterRealm = message.readOnlyMasterRealm;
                if (message.whitelistedRealms && message.whitelistedRealms.length) {
                    object.whitelistedRealms = [];
                    for (var j = 0; j < message.whitelistedRealms.length; ++j)
                        object.whitelistedRealms[j] = message.whitelistedRealms[j];
                }
                if (message.gcpManagedKeysMaxRequestedTtl != null && message.hasOwnProperty("gcpManagedKeysMaxRequestedTtl"))
                    object.gcpManagedKeysMaxRequestedTtl = message.gcpManagedKeysMaxRequestedTtl;
                if (message.gcpManagedKeysPerAccount != null && message.hasOwnProperty("gcpManagedKeysPerAccount"))
                    object.gcpManagedKeysPerAccount = message.gcpManagedKeysPerAccount;
                if (message.gcpServiceAccountProject != null && message.hasOwnProperty("gcpServiceAccountProject"))
                    object.gcpServiceAccountProject = message.gcpServiceAccountProject;
                var keys2;
                if (message.computedDescriptors && (keys2 = Object.keys(message.computedDescriptors)).length) {
                    object.computedDescriptors = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.computedDescriptors[keys2[j]] = $root.dam.v1.ConfigOptions.Descriptor.toObject(message.computedDescriptors[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this ConfigOptions to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            ConfigOptions.Descriptor = (function() {

                /**
                 * Properties of a Descriptor.
                 * @memberof dam.v1.ConfigOptions
                 * @interface IDescriptor
                 * @property {string|null} [label] Descriptor label
                 * @property {string|null} [description] Descriptor description
                 * @property {string|null} [regexp] Descriptor regexp
                 * @property {string|null} [type] Descriptor type
                 * @property {boolean|null} [isList] Descriptor isList
                 * @property {Array.<string>|null} [enumValues] Descriptor enumValues
                 * @property {string|null} [min] Descriptor min
                 * @property {string|null} [max] Descriptor max
                 * @property {string|null} [defaultValue] Descriptor defaultValue
                 */

                /**
                 * Constructs a new Descriptor.
                 * @memberof dam.v1.ConfigOptions
                 * @classdesc Represents a Descriptor.
                 * @implements IDescriptor
                 * @constructor
                 * @param {dam.v1.ConfigOptions.IDescriptor=} [properties] Properties to set
                 */
                function Descriptor(properties) {
                    this.enumValues = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Descriptor label.
                 * @member {string} label
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.label = "";

                /**
                 * Descriptor description.
                 * @member {string} description
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.description = "";

                /**
                 * Descriptor regexp.
                 * @member {string} regexp
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.regexp = "";

                /**
                 * Descriptor type.
                 * @member {string} type
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.type = "";

                /**
                 * Descriptor isList.
                 * @member {boolean} isList
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.isList = false;

                /**
                 * Descriptor enumValues.
                 * @member {Array.<string>} enumValues
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.enumValues = $util.emptyArray;

                /**
                 * Descriptor min.
                 * @member {string} min
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.min = "";

                /**
                 * Descriptor max.
                 * @member {string} max
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.max = "";

                /**
                 * Descriptor defaultValue.
                 * @member {string} defaultValue
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 */
                Descriptor.prototype.defaultValue = "";

                /**
                 * Creates a new Descriptor instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {dam.v1.ConfigOptions.IDescriptor=} [properties] Properties to set
                 * @returns {dam.v1.ConfigOptions.Descriptor} Descriptor instance
                 */
                Descriptor.create = function create(properties) {
                    return new Descriptor(properties);
                };

                /**
                 * Encodes the specified Descriptor message. Does not implicitly {@link dam.v1.ConfigOptions.Descriptor.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {dam.v1.ConfigOptions.IDescriptor} message Descriptor message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Descriptor.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.label != null && message.hasOwnProperty("label"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.label);
                    if (message.description != null && message.hasOwnProperty("description"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
                    if (message.regexp != null && message.hasOwnProperty("regexp"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.regexp);
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.type);
                    if (message.isList != null && message.hasOwnProperty("isList"))
                        writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isList);
                    if (message.enumValues != null && message.enumValues.length)
                        for (var i = 0; i < message.enumValues.length; ++i)
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.enumValues[i]);
                    if (message.min != null && message.hasOwnProperty("min"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.min);
                    if (message.max != null && message.hasOwnProperty("max"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.max);
                    if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                        writer.uint32(/* id 9, wireType 2 =*/74).string(message.defaultValue);
                    return writer;
                };

                /**
                 * Encodes the specified Descriptor message, length delimited. Does not implicitly {@link dam.v1.ConfigOptions.Descriptor.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {dam.v1.ConfigOptions.IDescriptor} message Descriptor message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Descriptor.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Descriptor message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.ConfigOptions.Descriptor} Descriptor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Descriptor.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigOptions.Descriptor();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.label = reader.string();
                            break;
                        case 2:
                            message.description = reader.string();
                            break;
                        case 3:
                            message.regexp = reader.string();
                            break;
                        case 4:
                            message.type = reader.string();
                            break;
                        case 5:
                            message.isList = reader.bool();
                            break;
                        case 6:
                            if (!(message.enumValues && message.enumValues.length))
                                message.enumValues = [];
                            message.enumValues.push(reader.string());
                            break;
                        case 7:
                            message.min = reader.string();
                            break;
                        case 8:
                            message.max = reader.string();
                            break;
                        case 9:
                            message.defaultValue = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Descriptor message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.ConfigOptions.Descriptor} Descriptor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Descriptor.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Descriptor message.
                 * @function verify
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Descriptor.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.label != null && message.hasOwnProperty("label"))
                        if (!$util.isString(message.label))
                            return "label: string expected";
                    if (message.description != null && message.hasOwnProperty("description"))
                        if (!$util.isString(message.description))
                            return "description: string expected";
                    if (message.regexp != null && message.hasOwnProperty("regexp"))
                        if (!$util.isString(message.regexp))
                            return "regexp: string expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        if (!$util.isString(message.type))
                            return "type: string expected";
                    if (message.isList != null && message.hasOwnProperty("isList"))
                        if (typeof message.isList !== "boolean")
                            return "isList: boolean expected";
                    if (message.enumValues != null && message.hasOwnProperty("enumValues")) {
                        if (!Array.isArray(message.enumValues))
                            return "enumValues: array expected";
                        for (var i = 0; i < message.enumValues.length; ++i)
                            if (!$util.isString(message.enumValues[i]))
                                return "enumValues: string[] expected";
                    }
                    if (message.min != null && message.hasOwnProperty("min"))
                        if (!$util.isString(message.min))
                            return "min: string expected";
                    if (message.max != null && message.hasOwnProperty("max"))
                        if (!$util.isString(message.max))
                            return "max: string expected";
                    if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                        if (!$util.isString(message.defaultValue))
                            return "defaultValue: string expected";
                    return null;
                };

                /**
                 * Creates a Descriptor message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.ConfigOptions.Descriptor} Descriptor
                 */
                Descriptor.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.ConfigOptions.Descriptor)
                        return object;
                    var message = new $root.dam.v1.ConfigOptions.Descriptor();
                    if (object.label != null)
                        message.label = String(object.label);
                    if (object.description != null)
                        message.description = String(object.description);
                    if (object.regexp != null)
                        message.regexp = String(object.regexp);
                    if (object.type != null)
                        message.type = String(object.type);
                    if (object.isList != null)
                        message.isList = Boolean(object.isList);
                    if (object.enumValues) {
                        if (!Array.isArray(object.enumValues))
                            throw TypeError(".dam.v1.ConfigOptions.Descriptor.enumValues: array expected");
                        message.enumValues = [];
                        for (var i = 0; i < object.enumValues.length; ++i)
                            message.enumValues[i] = String(object.enumValues[i]);
                    }
                    if (object.min != null)
                        message.min = String(object.min);
                    if (object.max != null)
                        message.max = String(object.max);
                    if (object.defaultValue != null)
                        message.defaultValue = String(object.defaultValue);
                    return message;
                };

                /**
                 * Creates a plain object from a Descriptor message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @static
                 * @param {dam.v1.ConfigOptions.Descriptor} message Descriptor
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Descriptor.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.enumValues = [];
                    if (options.defaults) {
                        object.label = "";
                        object.description = "";
                        object.regexp = "";
                        object.type = "";
                        object.isList = false;
                        object.min = "";
                        object.max = "";
                        object.defaultValue = "";
                    }
                    if (message.label != null && message.hasOwnProperty("label"))
                        object.label = message.label;
                    if (message.description != null && message.hasOwnProperty("description"))
                        object.description = message.description;
                    if (message.regexp != null && message.hasOwnProperty("regexp"))
                        object.regexp = message.regexp;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = message.type;
                    if (message.isList != null && message.hasOwnProperty("isList"))
                        object.isList = message.isList;
                    if (message.enumValues && message.enumValues.length) {
                        object.enumValues = [];
                        for (var j = 0; j < message.enumValues.length; ++j)
                            object.enumValues[j] = message.enumValues[j];
                    }
                    if (message.min != null && message.hasOwnProperty("min"))
                        object.min = message.min;
                    if (message.max != null && message.hasOwnProperty("max"))
                        object.max = message.max;
                    if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                        object.defaultValue = message.defaultValue;
                    return object;
                };

                /**
                 * Converts this Descriptor to JSON.
                 * @function toJSON
                 * @memberof dam.v1.ConfigOptions.Descriptor
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Descriptor.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Descriptor;
            })();

            return ConfigOptions;
        })();

        v1.ClaimDefinition = (function() {

            /**
             * Properties of a ClaimDefinition.
             * @memberof dam.v1
             * @interface IClaimDefinition
             * @property {Object.<string,string>|null} [ui] ClaimDefinition ui
             */

            /**
             * Constructs a new ClaimDefinition.
             * @memberof dam.v1
             * @classdesc Represents a ClaimDefinition.
             * @implements IClaimDefinition
             * @constructor
             * @param {dam.v1.IClaimDefinition=} [properties] Properties to set
             */
            function ClaimDefinition(properties) {
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClaimDefinition ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.ClaimDefinition
             * @instance
             */
            ClaimDefinition.prototype.ui = $util.emptyObject;

            /**
             * Creates a new ClaimDefinition instance using the specified properties.
             * @function create
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {dam.v1.IClaimDefinition=} [properties] Properties to set
             * @returns {dam.v1.ClaimDefinition} ClaimDefinition instance
             */
            ClaimDefinition.create = function create(properties) {
                return new ClaimDefinition(properties);
            };

            /**
             * Encodes the specified ClaimDefinition message. Does not implicitly {@link dam.v1.ClaimDefinition.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {dam.v1.IClaimDefinition} message ClaimDefinition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClaimDefinition.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ClaimDefinition message, length delimited. Does not implicitly {@link dam.v1.ClaimDefinition.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {dam.v1.IClaimDefinition} message ClaimDefinition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClaimDefinition.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClaimDefinition message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ClaimDefinition} ClaimDefinition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClaimDefinition.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ClaimDefinition(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ClaimDefinition message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ClaimDefinition} ClaimDefinition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClaimDefinition.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClaimDefinition message.
             * @function verify
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClaimDefinition.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a ClaimDefinition message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ClaimDefinition} ClaimDefinition
             */
            ClaimDefinition.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ClaimDefinition)
                    return object;
                var message = new $root.dam.v1.ClaimDefinition();
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.ClaimDefinition.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a ClaimDefinition message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ClaimDefinition
             * @static
             * @param {dam.v1.ClaimDefinition} message ClaimDefinition
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClaimDefinition.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ui = {};
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this ClaimDefinition to JSON.
             * @function toJSON
             * @memberof dam.v1.ClaimDefinition
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClaimDefinition.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClaimDefinition;
        })();

        v1.AccessList = (function() {

            /**
             * Properties of an AccessList.
             * @memberof dam.v1
             * @interface IAccessList
             * @property {Array.<string>|null} [access] AccessList access
             */

            /**
             * Constructs a new AccessList.
             * @memberof dam.v1
             * @classdesc Represents an AccessList.
             * @implements IAccessList
             * @constructor
             * @param {dam.v1.IAccessList=} [properties] Properties to set
             */
            function AccessList(properties) {
                this.access = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AccessList access.
             * @member {Array.<string>} access
             * @memberof dam.v1.AccessList
             * @instance
             */
            AccessList.prototype.access = $util.emptyArray;

            /**
             * Creates a new AccessList instance using the specified properties.
             * @function create
             * @memberof dam.v1.AccessList
             * @static
             * @param {dam.v1.IAccessList=} [properties] Properties to set
             * @returns {dam.v1.AccessList} AccessList instance
             */
            AccessList.create = function create(properties) {
                return new AccessList(properties);
            };

            /**
             * Encodes the specified AccessList message. Does not implicitly {@link dam.v1.AccessList.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.AccessList
             * @static
             * @param {dam.v1.IAccessList} message AccessList message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessList.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.access != null && message.access.length)
                    for (var i = 0; i < message.access.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.access[i]);
                return writer;
            };

            /**
             * Encodes the specified AccessList message, length delimited. Does not implicitly {@link dam.v1.AccessList.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.AccessList
             * @static
             * @param {dam.v1.IAccessList} message AccessList message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AccessList message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.AccessList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.AccessList} AccessList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.AccessList();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.access && message.access.length))
                            message.access = [];
                        message.access.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AccessList message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.AccessList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.AccessList} AccessList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AccessList message.
             * @function verify
             * @memberof dam.v1.AccessList
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AccessList.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.access != null && message.hasOwnProperty("access")) {
                    if (!Array.isArray(message.access))
                        return "access: array expected";
                    for (var i = 0; i < message.access.length; ++i)
                        if (!$util.isString(message.access[i]))
                            return "access: string[] expected";
                }
                return null;
            };

            /**
             * Creates an AccessList message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.AccessList
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.AccessList} AccessList
             */
            AccessList.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.AccessList)
                    return object;
                var message = new $root.dam.v1.AccessList();
                if (object.access) {
                    if (!Array.isArray(object.access))
                        throw TypeError(".dam.v1.AccessList.access: array expected");
                    message.access = [];
                    for (var i = 0; i < object.access.length; ++i)
                        message.access[i] = String(object.access[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from an AccessList message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.AccessList
             * @static
             * @param {dam.v1.AccessList} message AccessList
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AccessList.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.access = [];
                if (message.access && message.access.length) {
                    object.access = [];
                    for (var j = 0; j < message.access.length; ++j)
                        object.access[j] = message.access[j];
                }
                return object;
            };

            /**
             * Converts this AccessList to JSON.
             * @function toJSON
             * @memberof dam.v1.AccessList
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AccessList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AccessList;
        })();

        v1.TestPersona = (function() {

            /**
             * Properties of a TestPersona.
             * @memberof dam.v1
             * @interface ITestPersona
             * @property {dam.v1.TestPersona.ITestIdentityToken|null} [idToken] TestPersona idToken
             * @property {Object.<string,dam.v1.IAccessList>|null} [resources] TestPersona resources
             * @property {Object.<string,string>|null} [ui] TestPersona ui
             */

            /**
             * Constructs a new TestPersona.
             * @memberof dam.v1
             * @classdesc Represents a TestPersona.
             * @implements ITestPersona
             * @constructor
             * @param {dam.v1.ITestPersona=} [properties] Properties to set
             */
            function TestPersona(properties) {
                this.resources = {};
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TestPersona idToken.
             * @member {dam.v1.TestPersona.ITestIdentityToken|null|undefined} idToken
             * @memberof dam.v1.TestPersona
             * @instance
             */
            TestPersona.prototype.idToken = null;

            /**
             * TestPersona resources.
             * @member {Object.<string,dam.v1.IAccessList>} resources
             * @memberof dam.v1.TestPersona
             * @instance
             */
            TestPersona.prototype.resources = $util.emptyObject;

            /**
             * TestPersona ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.TestPersona
             * @instance
             */
            TestPersona.prototype.ui = $util.emptyObject;

            /**
             * Creates a new TestPersona instance using the specified properties.
             * @function create
             * @memberof dam.v1.TestPersona
             * @static
             * @param {dam.v1.ITestPersona=} [properties] Properties to set
             * @returns {dam.v1.TestPersona} TestPersona instance
             */
            TestPersona.create = function create(properties) {
                return new TestPersona(properties);
            };

            /**
             * Encodes the specified TestPersona message. Does not implicitly {@link dam.v1.TestPersona.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.TestPersona
             * @static
             * @param {dam.v1.ITestPersona} message TestPersona message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestPersona.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.idToken != null && message.hasOwnProperty("idToken"))
                    $root.dam.v1.TestPersona.TestIdentityToken.encode(message.idToken, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.resources != null && message.hasOwnProperty("resources"))
                    for (var keys = Object.keys(message.resources), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.AccessList.encode(message.resources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TestPersona message, length delimited. Does not implicitly {@link dam.v1.TestPersona.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.TestPersona
             * @static
             * @param {dam.v1.ITestPersona} message TestPersona message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestPersona.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestPersona message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.TestPersona
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.TestPersona} TestPersona
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TestPersona.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TestPersona(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.idToken = $root.dam.v1.TestPersona.TestIdentityToken.decode(reader, reader.uint32());
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.resources === $util.emptyObject)
                            message.resources = {};
                        key = reader.string();
                        reader.pos++;
                        message.resources[key] = $root.dam.v1.AccessList.decode(reader, reader.uint32());
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TestPersona message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.TestPersona
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.TestPersona} TestPersona
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TestPersona.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TestPersona message.
             * @function verify
             * @memberof dam.v1.TestPersona
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TestPersona.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.idToken != null && message.hasOwnProperty("idToken")) {
                    var error = $root.dam.v1.TestPersona.TestIdentityToken.verify(message.idToken);
                    if (error)
                        return "idToken." + error;
                }
                if (message.resources != null && message.hasOwnProperty("resources")) {
                    if (!$util.isObject(message.resources))
                        return "resources: object expected";
                    var key = Object.keys(message.resources);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.AccessList.verify(message.resources[key[i]]);
                        if (error)
                            return "resources." + error;
                    }
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a TestPersona message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.TestPersona
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.TestPersona} TestPersona
             */
            TestPersona.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.TestPersona)
                    return object;
                var message = new $root.dam.v1.TestPersona();
                if (object.idToken != null) {
                    if (typeof object.idToken !== "object")
                        throw TypeError(".dam.v1.TestPersona.idToken: object expected");
                    message.idToken = $root.dam.v1.TestPersona.TestIdentityToken.fromObject(object.idToken);
                }
                if (object.resources) {
                    if (typeof object.resources !== "object")
                        throw TypeError(".dam.v1.TestPersona.resources: object expected");
                    message.resources = {};
                    for (var keys = Object.keys(object.resources), i = 0; i < keys.length; ++i) {
                        if (typeof object.resources[keys[i]] !== "object")
                            throw TypeError(".dam.v1.TestPersona.resources: object expected");
                        message.resources[keys[i]] = $root.dam.v1.AccessList.fromObject(object.resources[keys[i]]);
                    }
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.TestPersona.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a TestPersona message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.TestPersona
             * @static
             * @param {dam.v1.TestPersona} message TestPersona
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TestPersona.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.resources = {};
                    object.ui = {};
                }
                if (options.defaults)
                    object.idToken = null;
                if (message.idToken != null && message.hasOwnProperty("idToken"))
                    object.idToken = $root.dam.v1.TestPersona.TestIdentityToken.toObject(message.idToken, options);
                var keys2;
                if (message.resources && (keys2 = Object.keys(message.resources)).length) {
                    object.resources = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.resources[keys2[j]] = $root.dam.v1.AccessList.toObject(message.resources[keys2[j]], options);
                }
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this TestPersona to JSON.
             * @function toJSON
             * @memberof dam.v1.TestPersona
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TestPersona.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            TestPersona.GA4GHClaim = (function() {

                /**
                 * Properties of a GA4GHClaim.
                 * @memberof dam.v1.TestPersona
                 * @interface IGA4GHClaim
                 * @property {string|null} [claimName] GA4GHClaim claimName
                 * @property {string|null} [source] GA4GHClaim source
                 * @property {string|null} [value] GA4GHClaim value
                 * @property {number|null} [iat] GA4GHClaim iat
                 * @property {number|null} [exp] GA4GHClaim exp
                 * @property {string|null} [scope] GA4GHClaim scope
                 * @property {string|null} [by] GA4GHClaim by
                 */

                /**
                 * Constructs a new GA4GHClaim.
                 * @memberof dam.v1.TestPersona
                 * @classdesc Represents a GA4GHClaim.
                 * @implements IGA4GHClaim
                 * @constructor
                 * @param {dam.v1.TestPersona.IGA4GHClaim=} [properties] Properties to set
                 */
                function GA4GHClaim(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GA4GHClaim claimName.
                 * @member {string} claimName
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.claimName = "";

                /**
                 * GA4GHClaim source.
                 * @member {string} source
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.source = "";

                /**
                 * GA4GHClaim value.
                 * @member {string} value
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.value = "";

                /**
                 * GA4GHClaim iat.
                 * @member {number} iat
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.iat = 0;

                /**
                 * GA4GHClaim exp.
                 * @member {number} exp
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.exp = 0;

                /**
                 * GA4GHClaim scope.
                 * @member {string} scope
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.scope = "";

                /**
                 * GA4GHClaim by.
                 * @member {string} by
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 */
                GA4GHClaim.prototype.by = "";

                /**
                 * Creates a new GA4GHClaim instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {dam.v1.TestPersona.IGA4GHClaim=} [properties] Properties to set
                 * @returns {dam.v1.TestPersona.GA4GHClaim} GA4GHClaim instance
                 */
                GA4GHClaim.create = function create(properties) {
                    return new GA4GHClaim(properties);
                };

                /**
                 * Encodes the specified GA4GHClaim message. Does not implicitly {@link dam.v1.TestPersona.GA4GHClaim.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {dam.v1.TestPersona.IGA4GHClaim} message GA4GHClaim message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GA4GHClaim.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.claimName != null && message.hasOwnProperty("claimName"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.claimName);
                    if (message.source != null && message.hasOwnProperty("source"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.source);
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.value);
                    if (message.iat != null && message.hasOwnProperty("iat"))
                        writer.uint32(/* id 4, wireType 1 =*/33).double(message.iat);
                    if (message.exp != null && message.hasOwnProperty("exp"))
                        writer.uint32(/* id 5, wireType 1 =*/41).double(message.exp);
                    if (message.scope != null && message.hasOwnProperty("scope"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.scope);
                    if (message.by != null && message.hasOwnProperty("by"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.by);
                    return writer;
                };

                /**
                 * Encodes the specified GA4GHClaim message, length delimited. Does not implicitly {@link dam.v1.TestPersona.GA4GHClaim.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {dam.v1.TestPersona.IGA4GHClaim} message GA4GHClaim message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GA4GHClaim.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GA4GHClaim message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.TestPersona.GA4GHClaim} GA4GHClaim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GA4GHClaim.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TestPersona.GA4GHClaim();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.claimName = reader.string();
                            break;
                        case 2:
                            message.source = reader.string();
                            break;
                        case 3:
                            message.value = reader.string();
                            break;
                        case 4:
                            message.iat = reader.double();
                            break;
                        case 5:
                            message.exp = reader.double();
                            break;
                        case 6:
                            message.scope = reader.string();
                            break;
                        case 7:
                            message.by = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GA4GHClaim message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.TestPersona.GA4GHClaim} GA4GHClaim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GA4GHClaim.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GA4GHClaim message.
                 * @function verify
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GA4GHClaim.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.claimName != null && message.hasOwnProperty("claimName"))
                        if (!$util.isString(message.claimName))
                            return "claimName: string expected";
                    if (message.source != null && message.hasOwnProperty("source"))
                        if (!$util.isString(message.source))
                            return "source: string expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isString(message.value))
                            return "value: string expected";
                    if (message.iat != null && message.hasOwnProperty("iat"))
                        if (typeof message.iat !== "number")
                            return "iat: number expected";
                    if (message.exp != null && message.hasOwnProperty("exp"))
                        if (typeof message.exp !== "number")
                            return "exp: number expected";
                    if (message.scope != null && message.hasOwnProperty("scope"))
                        if (!$util.isString(message.scope))
                            return "scope: string expected";
                    if (message.by != null && message.hasOwnProperty("by"))
                        if (!$util.isString(message.by))
                            return "by: string expected";
                    return null;
                };

                /**
                 * Creates a GA4GHClaim message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.TestPersona.GA4GHClaim} GA4GHClaim
                 */
                GA4GHClaim.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.TestPersona.GA4GHClaim)
                        return object;
                    var message = new $root.dam.v1.TestPersona.GA4GHClaim();
                    if (object.claimName != null)
                        message.claimName = String(object.claimName);
                    if (object.source != null)
                        message.source = String(object.source);
                    if (object.value != null)
                        message.value = String(object.value);
                    if (object.iat != null)
                        message.iat = Number(object.iat);
                    if (object.exp != null)
                        message.exp = Number(object.exp);
                    if (object.scope != null)
                        message.scope = String(object.scope);
                    if (object.by != null)
                        message.by = String(object.by);
                    return message;
                };

                /**
                 * Creates a plain object from a GA4GHClaim message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @static
                 * @param {dam.v1.TestPersona.GA4GHClaim} message GA4GHClaim
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GA4GHClaim.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.claimName = "";
                        object.source = "";
                        object.value = "";
                        object.iat = 0;
                        object.exp = 0;
                        object.scope = "";
                        object.by = "";
                    }
                    if (message.claimName != null && message.hasOwnProperty("claimName"))
                        object.claimName = message.claimName;
                    if (message.source != null && message.hasOwnProperty("source"))
                        object.source = message.source;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    if (message.iat != null && message.hasOwnProperty("iat"))
                        object.iat = options.json && !isFinite(message.iat) ? String(message.iat) : message.iat;
                    if (message.exp != null && message.hasOwnProperty("exp"))
                        object.exp = options.json && !isFinite(message.exp) ? String(message.exp) : message.exp;
                    if (message.scope != null && message.hasOwnProperty("scope"))
                        object.scope = message.scope;
                    if (message.by != null && message.hasOwnProperty("by"))
                        object.by = message.by;
                    return object;
                };

                /**
                 * Converts this GA4GHClaim to JSON.
                 * @function toJSON
                 * @memberof dam.v1.TestPersona.GA4GHClaim
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GA4GHClaim.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GA4GHClaim;
            })();

            TestPersona.TestIdentityToken = (function() {

                /**
                 * Properties of a TestIdentityToken.
                 * @memberof dam.v1.TestPersona
                 * @interface ITestIdentityToken
                 * @property {Object.<string,string>|null} [standardClaims] TestIdentityToken standardClaims
                 * @property {Array.<dam.v1.TestPersona.IGA4GHClaim>|null} [ga4ghClaims] TestIdentityToken ga4ghClaims
                 */

                /**
                 * Constructs a new TestIdentityToken.
                 * @memberof dam.v1.TestPersona
                 * @classdesc Represents a TestIdentityToken.
                 * @implements ITestIdentityToken
                 * @constructor
                 * @param {dam.v1.TestPersona.ITestIdentityToken=} [properties] Properties to set
                 */
                function TestIdentityToken(properties) {
                    this.standardClaims = {};
                    this.ga4ghClaims = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestIdentityToken standardClaims.
                 * @member {Object.<string,string>} standardClaims
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @instance
                 */
                TestIdentityToken.prototype.standardClaims = $util.emptyObject;

                /**
                 * TestIdentityToken ga4ghClaims.
                 * @member {Array.<dam.v1.TestPersona.IGA4GHClaim>} ga4ghClaims
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @instance
                 */
                TestIdentityToken.prototype.ga4ghClaims = $util.emptyArray;

                /**
                 * Creates a new TestIdentityToken instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {dam.v1.TestPersona.ITestIdentityToken=} [properties] Properties to set
                 * @returns {dam.v1.TestPersona.TestIdentityToken} TestIdentityToken instance
                 */
                TestIdentityToken.create = function create(properties) {
                    return new TestIdentityToken(properties);
                };

                /**
                 * Encodes the specified TestIdentityToken message. Does not implicitly {@link dam.v1.TestPersona.TestIdentityToken.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {dam.v1.TestPersona.ITestIdentityToken} message TestIdentityToken message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestIdentityToken.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.standardClaims != null && message.hasOwnProperty("standardClaims"))
                        for (var keys = Object.keys(message.standardClaims), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.standardClaims[keys[i]]).ldelim();
                    if (message.ga4ghClaims != null && message.ga4ghClaims.length)
                        for (var i = 0; i < message.ga4ghClaims.length; ++i)
                            $root.dam.v1.TestPersona.GA4GHClaim.encode(message.ga4ghClaims[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestIdentityToken message, length delimited. Does not implicitly {@link dam.v1.TestPersona.TestIdentityToken.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {dam.v1.TestPersona.ITestIdentityToken} message TestIdentityToken message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestIdentityToken.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestIdentityToken message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.TestPersona.TestIdentityToken} TestIdentityToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestIdentityToken.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TestPersona.TestIdentityToken(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            reader.skip().pos++;
                            if (message.standardClaims === $util.emptyObject)
                                message.standardClaims = {};
                            key = reader.string();
                            reader.pos++;
                            message.standardClaims[key] = reader.string();
                            break;
                        case 2:
                            if (!(message.ga4ghClaims && message.ga4ghClaims.length))
                                message.ga4ghClaims = [];
                            message.ga4ghClaims.push($root.dam.v1.TestPersona.GA4GHClaim.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestIdentityToken message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.TestPersona.TestIdentityToken} TestIdentityToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestIdentityToken.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestIdentityToken message.
                 * @function verify
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestIdentityToken.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.standardClaims != null && message.hasOwnProperty("standardClaims")) {
                        if (!$util.isObject(message.standardClaims))
                            return "standardClaims: object expected";
                        var key = Object.keys(message.standardClaims);
                        for (var i = 0; i < key.length; ++i)
                            if (!$util.isString(message.standardClaims[key[i]]))
                                return "standardClaims: string{k:string} expected";
                    }
                    if (message.ga4ghClaims != null && message.hasOwnProperty("ga4ghClaims")) {
                        if (!Array.isArray(message.ga4ghClaims))
                            return "ga4ghClaims: array expected";
                        for (var i = 0; i < message.ga4ghClaims.length; ++i) {
                            var error = $root.dam.v1.TestPersona.GA4GHClaim.verify(message.ga4ghClaims[i]);
                            if (error)
                                return "ga4ghClaims." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a TestIdentityToken message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.TestPersona.TestIdentityToken} TestIdentityToken
                 */
                TestIdentityToken.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.TestPersona.TestIdentityToken)
                        return object;
                    var message = new $root.dam.v1.TestPersona.TestIdentityToken();
                    if (object.standardClaims) {
                        if (typeof object.standardClaims !== "object")
                            throw TypeError(".dam.v1.TestPersona.TestIdentityToken.standardClaims: object expected");
                        message.standardClaims = {};
                        for (var keys = Object.keys(object.standardClaims), i = 0; i < keys.length; ++i)
                            message.standardClaims[keys[i]] = String(object.standardClaims[keys[i]]);
                    }
                    if (object.ga4ghClaims) {
                        if (!Array.isArray(object.ga4ghClaims))
                            throw TypeError(".dam.v1.TestPersona.TestIdentityToken.ga4ghClaims: array expected");
                        message.ga4ghClaims = [];
                        for (var i = 0; i < object.ga4ghClaims.length; ++i) {
                            if (typeof object.ga4ghClaims[i] !== "object")
                                throw TypeError(".dam.v1.TestPersona.TestIdentityToken.ga4ghClaims: object expected");
                            message.ga4ghClaims[i] = $root.dam.v1.TestPersona.GA4GHClaim.fromObject(object.ga4ghClaims[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestIdentityToken message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @static
                 * @param {dam.v1.TestPersona.TestIdentityToken} message TestIdentityToken
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestIdentityToken.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.ga4ghClaims = [];
                    if (options.objects || options.defaults)
                        object.standardClaims = {};
                    var keys2;
                    if (message.standardClaims && (keys2 = Object.keys(message.standardClaims)).length) {
                        object.standardClaims = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.standardClaims[keys2[j]] = message.standardClaims[keys2[j]];
                    }
                    if (message.ga4ghClaims && message.ga4ghClaims.length) {
                        object.ga4ghClaims = [];
                        for (var j = 0; j < message.ga4ghClaims.length; ++j)
                            object.ga4ghClaims[j] = $root.dam.v1.TestPersona.GA4GHClaim.toObject(message.ga4ghClaims[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this TestIdentityToken to JSON.
                 * @function toJSON
                 * @memberof dam.v1.TestPersona.TestIdentityToken
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestIdentityToken.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestIdentityToken;
            })();

            return TestPersona;
        })();

        v1.HistoryEntry = (function() {

            /**
             * Properties of a HistoryEntry.
             * @memberof dam.v1
             * @interface IHistoryEntry
             * @property {number|Long|null} [revision] HistoryEntry revision
             * @property {string|null} [user] HistoryEntry user
             * @property {number|null} [commitTime] HistoryEntry commitTime
             * @property {string|null} [path] HistoryEntry path
             * @property {string|null} [query] HistoryEntry query
             * @property {string|null} [desc] HistoryEntry desc
             * @property {string|null} [method] HistoryEntry method
             * @property {string|null} [changeType] HistoryEntry changeType
             * @property {string|null} [originalValue] HistoryEntry originalValue
             * @property {string|null} [changeRequest] HistoryEntry changeRequest
             */

            /**
             * Constructs a new HistoryEntry.
             * @memberof dam.v1
             * @classdesc Represents a HistoryEntry.
             * @implements IHistoryEntry
             * @constructor
             * @param {dam.v1.IHistoryEntry=} [properties] Properties to set
             */
            function HistoryEntry(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HistoryEntry revision.
             * @member {number|Long} revision
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * HistoryEntry user.
             * @member {string} user
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.user = "";

            /**
             * HistoryEntry commitTime.
             * @member {number} commitTime
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.commitTime = 0;

            /**
             * HistoryEntry path.
             * @member {string} path
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.path = "";

            /**
             * HistoryEntry query.
             * @member {string} query
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.query = "";

            /**
             * HistoryEntry desc.
             * @member {string} desc
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.desc = "";

            /**
             * HistoryEntry method.
             * @member {string} method
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.method = "";

            /**
             * HistoryEntry changeType.
             * @member {string} changeType
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.changeType = "";

            /**
             * HistoryEntry originalValue.
             * @member {string} originalValue
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.originalValue = "";

            /**
             * HistoryEntry changeRequest.
             * @member {string} changeRequest
             * @memberof dam.v1.HistoryEntry
             * @instance
             */
            HistoryEntry.prototype.changeRequest = "";

            /**
             * Creates a new HistoryEntry instance using the specified properties.
             * @function create
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {dam.v1.IHistoryEntry=} [properties] Properties to set
             * @returns {dam.v1.HistoryEntry} HistoryEntry instance
             */
            HistoryEntry.create = function create(properties) {
                return new HistoryEntry(properties);
            };

            /**
             * Encodes the specified HistoryEntry message. Does not implicitly {@link dam.v1.HistoryEntry.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {dam.v1.IHistoryEntry} message HistoryEntry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HistoryEntry.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.revision != null && message.hasOwnProperty("revision"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.revision);
                if (message.user != null && message.hasOwnProperty("user"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.user);
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.commitTime);
                if (message.path != null && message.hasOwnProperty("path"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.path);
                if (message.query != null && message.hasOwnProperty("query"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.query);
                if (message.desc != null && message.hasOwnProperty("desc"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.desc);
                if (message.method != null && message.hasOwnProperty("method"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.method);
                if (message.changeType != null && message.hasOwnProperty("changeType"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.changeType);
                if (message.originalValue != null && message.hasOwnProperty("originalValue"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.originalValue);
                if (message.changeRequest != null && message.hasOwnProperty("changeRequest"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.changeRequest);
                return writer;
            };

            /**
             * Encodes the specified HistoryEntry message, length delimited. Does not implicitly {@link dam.v1.HistoryEntry.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {dam.v1.IHistoryEntry} message HistoryEntry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HistoryEntry.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HistoryEntry message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.HistoryEntry} HistoryEntry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HistoryEntry.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.HistoryEntry();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.revision = reader.int64();
                        break;
                    case 2:
                        message.user = reader.string();
                        break;
                    case 3:
                        message.commitTime = reader.double();
                        break;
                    case 4:
                        message.path = reader.string();
                        break;
                    case 5:
                        message.query = reader.string();
                        break;
                    case 6:
                        message.desc = reader.string();
                        break;
                    case 7:
                        message.method = reader.string();
                        break;
                    case 8:
                        message.changeType = reader.string();
                        break;
                    case 9:
                        message.originalValue = reader.string();
                        break;
                    case 10:
                        message.changeRequest = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a HistoryEntry message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.HistoryEntry} HistoryEntry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HistoryEntry.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HistoryEntry message.
             * @function verify
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HistoryEntry.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                        return "revision: integer|Long expected";
                if (message.user != null && message.hasOwnProperty("user"))
                    if (!$util.isString(message.user))
                        return "user: string expected";
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    if (typeof message.commitTime !== "number")
                        return "commitTime: number expected";
                if (message.path != null && message.hasOwnProperty("path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.query != null && message.hasOwnProperty("query"))
                    if (!$util.isString(message.query))
                        return "query: string expected";
                if (message.desc != null && message.hasOwnProperty("desc"))
                    if (!$util.isString(message.desc))
                        return "desc: string expected";
                if (message.method != null && message.hasOwnProperty("method"))
                    if (!$util.isString(message.method))
                        return "method: string expected";
                if (message.changeType != null && message.hasOwnProperty("changeType"))
                    if (!$util.isString(message.changeType))
                        return "changeType: string expected";
                if (message.originalValue != null && message.hasOwnProperty("originalValue"))
                    if (!$util.isString(message.originalValue))
                        return "originalValue: string expected";
                if (message.changeRequest != null && message.hasOwnProperty("changeRequest"))
                    if (!$util.isString(message.changeRequest))
                        return "changeRequest: string expected";
                return null;
            };

            /**
             * Creates a HistoryEntry message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.HistoryEntry} HistoryEntry
             */
            HistoryEntry.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.HistoryEntry)
                    return object;
                var message = new $root.dam.v1.HistoryEntry();
                if (object.revision != null)
                    if ($util.Long)
                        (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                    else if (typeof object.revision === "string")
                        message.revision = parseInt(object.revision, 10);
                    else if (typeof object.revision === "number")
                        message.revision = object.revision;
                    else if (typeof object.revision === "object")
                        message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
                if (object.user != null)
                    message.user = String(object.user);
                if (object.commitTime != null)
                    message.commitTime = Number(object.commitTime);
                if (object.path != null)
                    message.path = String(object.path);
                if (object.query != null)
                    message.query = String(object.query);
                if (object.desc != null)
                    message.desc = String(object.desc);
                if (object.method != null)
                    message.method = String(object.method);
                if (object.changeType != null)
                    message.changeType = String(object.changeType);
                if (object.originalValue != null)
                    message.originalValue = String(object.originalValue);
                if (object.changeRequest != null)
                    message.changeRequest = String(object.changeRequest);
                return message;
            };

            /**
             * Creates a plain object from a HistoryEntry message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.HistoryEntry
             * @static
             * @param {dam.v1.HistoryEntry} message HistoryEntry
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HistoryEntry.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.revision = options.longs === String ? "0" : 0;
                    object.user = "";
                    object.commitTime = 0;
                    object.path = "";
                    object.query = "";
                    object.desc = "";
                    object.method = "";
                    object.changeType = "";
                    object.originalValue = "";
                    object.changeRequest = "";
                }
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (typeof message.revision === "number")
                        object.revision = options.longs === String ? String(message.revision) : message.revision;
                    else
                        object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = message.user;
                if (message.commitTime != null && message.hasOwnProperty("commitTime"))
                    object.commitTime = options.json && !isFinite(message.commitTime) ? String(message.commitTime) : message.commitTime;
                if (message.path != null && message.hasOwnProperty("path"))
                    object.path = message.path;
                if (message.query != null && message.hasOwnProperty("query"))
                    object.query = message.query;
                if (message.desc != null && message.hasOwnProperty("desc"))
                    object.desc = message.desc;
                if (message.method != null && message.hasOwnProperty("method"))
                    object.method = message.method;
                if (message.changeType != null && message.hasOwnProperty("changeType"))
                    object.changeType = message.changeType;
                if (message.originalValue != null && message.hasOwnProperty("originalValue"))
                    object.originalValue = message.originalValue;
                if (message.changeRequest != null && message.hasOwnProperty("changeRequest"))
                    object.changeRequest = message.changeRequest;
                return object;
            };

            /**
             * Converts this HistoryEntry to JSON.
             * @function toJSON
             * @memberof dam.v1.HistoryEntry
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HistoryEntry.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return HistoryEntry;
        })();

        v1.History = (function() {

            /**
             * Properties of a History.
             * @memberof dam.v1
             * @interface IHistory
             * @property {Array.<dam.v1.IHistoryEntry>|null} [history] History history
             * @property {string|null} [nextPageToken] History nextPageToken
             */

            /**
             * Constructs a new History.
             * @memberof dam.v1
             * @classdesc Represents a History.
             * @implements IHistory
             * @constructor
             * @param {dam.v1.IHistory=} [properties] Properties to set
             */
            function History(properties) {
                this.history = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * History history.
             * @member {Array.<dam.v1.IHistoryEntry>} history
             * @memberof dam.v1.History
             * @instance
             */
            History.prototype.history = $util.emptyArray;

            /**
             * History nextPageToken.
             * @member {string} nextPageToken
             * @memberof dam.v1.History
             * @instance
             */
            History.prototype.nextPageToken = "";

            /**
             * Creates a new History instance using the specified properties.
             * @function create
             * @memberof dam.v1.History
             * @static
             * @param {dam.v1.IHistory=} [properties] Properties to set
             * @returns {dam.v1.History} History instance
             */
            History.create = function create(properties) {
                return new History(properties);
            };

            /**
             * Encodes the specified History message. Does not implicitly {@link dam.v1.History.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.History
             * @static
             * @param {dam.v1.IHistory} message History message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            History.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.history != null && message.history.length)
                    for (var i = 0; i < message.history.length; ++i)
                        $root.dam.v1.HistoryEntry.encode(message.history[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.nextPageToken != null && message.hasOwnProperty("nextPageToken"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.nextPageToken);
                return writer;
            };

            /**
             * Encodes the specified History message, length delimited. Does not implicitly {@link dam.v1.History.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.History
             * @static
             * @param {dam.v1.IHistory} message History message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            History.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a History message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.History
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.History} History
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            History.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.History();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.history && message.history.length))
                            message.history = [];
                        message.history.push($root.dam.v1.HistoryEntry.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        message.nextPageToken = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a History message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.History
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.History} History
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            History.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a History message.
             * @function verify
             * @memberof dam.v1.History
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            History.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.history != null && message.hasOwnProperty("history")) {
                    if (!Array.isArray(message.history))
                        return "history: array expected";
                    for (var i = 0; i < message.history.length; ++i) {
                        var error = $root.dam.v1.HistoryEntry.verify(message.history[i]);
                        if (error)
                            return "history." + error;
                    }
                }
                if (message.nextPageToken != null && message.hasOwnProperty("nextPageToken"))
                    if (!$util.isString(message.nextPageToken))
                        return "nextPageToken: string expected";
                return null;
            };

            /**
             * Creates a History message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.History
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.History} History
             */
            History.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.History)
                    return object;
                var message = new $root.dam.v1.History();
                if (object.history) {
                    if (!Array.isArray(object.history))
                        throw TypeError(".dam.v1.History.history: array expected");
                    message.history = [];
                    for (var i = 0; i < object.history.length; ++i) {
                        if (typeof object.history[i] !== "object")
                            throw TypeError(".dam.v1.History.history: object expected");
                        message.history[i] = $root.dam.v1.HistoryEntry.fromObject(object.history[i]);
                    }
                }
                if (object.nextPageToken != null)
                    message.nextPageToken = String(object.nextPageToken);
                return message;
            };

            /**
             * Creates a plain object from a History message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.History
             * @static
             * @param {dam.v1.History} message History
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            History.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.history = [];
                if (options.defaults)
                    object.nextPageToken = "";
                if (message.history && message.history.length) {
                    object.history = [];
                    for (var j = 0; j < message.history.length; ++j)
                        object.history[j] = $root.dam.v1.HistoryEntry.toObject(message.history[j], options);
                }
                if (message.nextPageToken != null && message.hasOwnProperty("nextPageToken"))
                    object.nextPageToken = message.nextPageToken;
                return object;
            };

            /**
             * Converts this History to JSON.
             * @function toJSON
             * @memberof dam.v1.History
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            History.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return History;
        })();

        v1.TargetAdapter = (function() {

            /**
             * Properties of a TargetAdapter.
             * @memberof dam.v1
             * @interface ITargetAdapter
             * @property {string|null} [platform] TargetAdapter platform
             * @property {dam.v1.TargetAdapter.IRequirements|null} [requirements] TargetAdapter requirements
             * @property {dam.v1.TargetAdapter.IProperties|null} [properties] TargetAdapter properties
             * @property {Object.<string,dam.v1.IItemFormat>|null} [itemFormats] TargetAdapter itemFormats
             * @property {Object.<string,string>|null} [ui] TargetAdapter ui
             */

            /**
             * Constructs a new TargetAdapter.
             * @memberof dam.v1
             * @classdesc Represents a TargetAdapter.
             * @implements ITargetAdapter
             * @constructor
             * @param {dam.v1.ITargetAdapter=} [properties] Properties to set
             */
            function TargetAdapter(properties) {
                this.itemFormats = {};
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TargetAdapter platform.
             * @member {string} platform
             * @memberof dam.v1.TargetAdapter
             * @instance
             */
            TargetAdapter.prototype.platform = "";

            /**
             * TargetAdapter requirements.
             * @member {dam.v1.TargetAdapter.IRequirements|null|undefined} requirements
             * @memberof dam.v1.TargetAdapter
             * @instance
             */
            TargetAdapter.prototype.requirements = null;

            /**
             * TargetAdapter properties.
             * @member {dam.v1.TargetAdapter.IProperties|null|undefined} properties
             * @memberof dam.v1.TargetAdapter
             * @instance
             */
            TargetAdapter.prototype.properties = null;

            /**
             * TargetAdapter itemFormats.
             * @member {Object.<string,dam.v1.IItemFormat>} itemFormats
             * @memberof dam.v1.TargetAdapter
             * @instance
             */
            TargetAdapter.prototype.itemFormats = $util.emptyObject;

            /**
             * TargetAdapter ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.TargetAdapter
             * @instance
             */
            TargetAdapter.prototype.ui = $util.emptyObject;

            /**
             * Creates a new TargetAdapter instance using the specified properties.
             * @function create
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {dam.v1.ITargetAdapter=} [properties] Properties to set
             * @returns {dam.v1.TargetAdapter} TargetAdapter instance
             */
            TargetAdapter.create = function create(properties) {
                return new TargetAdapter(properties);
            };

            /**
             * Encodes the specified TargetAdapter message. Does not implicitly {@link dam.v1.TargetAdapter.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {dam.v1.ITargetAdapter} message TargetAdapter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TargetAdapter.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.platform != null && message.hasOwnProperty("platform"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.platform);
                if (message.requirements != null && message.hasOwnProperty("requirements"))
                    $root.dam.v1.TargetAdapter.Requirements.encode(message.requirements, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.properties != null && message.hasOwnProperty("properties"))
                    $root.dam.v1.TargetAdapter.Properties.encode(message.properties, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.itemFormats != null && message.hasOwnProperty("itemFormats"))
                    for (var keys = Object.keys(message.itemFormats), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.ItemFormat.encode(message.itemFormats[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TargetAdapter message, length delimited. Does not implicitly {@link dam.v1.TargetAdapter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {dam.v1.ITargetAdapter} message TargetAdapter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TargetAdapter.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TargetAdapter message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.TargetAdapter} TargetAdapter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TargetAdapter.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TargetAdapter(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.platform = reader.string();
                        break;
                    case 2:
                        message.requirements = $root.dam.v1.TargetAdapter.Requirements.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.properties = $root.dam.v1.TargetAdapter.Properties.decode(reader, reader.uint32());
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.itemFormats === $util.emptyObject)
                            message.itemFormats = {};
                        key = reader.string();
                        reader.pos++;
                        message.itemFormats[key] = $root.dam.v1.ItemFormat.decode(reader, reader.uint32());
                        break;
                    case 5:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TargetAdapter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.TargetAdapter} TargetAdapter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TargetAdapter.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TargetAdapter message.
             * @function verify
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TargetAdapter.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.platform != null && message.hasOwnProperty("platform"))
                    if (!$util.isString(message.platform))
                        return "platform: string expected";
                if (message.requirements != null && message.hasOwnProperty("requirements")) {
                    var error = $root.dam.v1.TargetAdapter.Requirements.verify(message.requirements);
                    if (error)
                        return "requirements." + error;
                }
                if (message.properties != null && message.hasOwnProperty("properties")) {
                    var error = $root.dam.v1.TargetAdapter.Properties.verify(message.properties);
                    if (error)
                        return "properties." + error;
                }
                if (message.itemFormats != null && message.hasOwnProperty("itemFormats")) {
                    if (!$util.isObject(message.itemFormats))
                        return "itemFormats: object expected";
                    var key = Object.keys(message.itemFormats);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.ItemFormat.verify(message.itemFormats[key[i]]);
                        if (error)
                            return "itemFormats." + error;
                    }
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a TargetAdapter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.TargetAdapter} TargetAdapter
             */
            TargetAdapter.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.TargetAdapter)
                    return object;
                var message = new $root.dam.v1.TargetAdapter();
                if (object.platform != null)
                    message.platform = String(object.platform);
                if (object.requirements != null) {
                    if (typeof object.requirements !== "object")
                        throw TypeError(".dam.v1.TargetAdapter.requirements: object expected");
                    message.requirements = $root.dam.v1.TargetAdapter.Requirements.fromObject(object.requirements);
                }
                if (object.properties != null) {
                    if (typeof object.properties !== "object")
                        throw TypeError(".dam.v1.TargetAdapter.properties: object expected");
                    message.properties = $root.dam.v1.TargetAdapter.Properties.fromObject(object.properties);
                }
                if (object.itemFormats) {
                    if (typeof object.itemFormats !== "object")
                        throw TypeError(".dam.v1.TargetAdapter.itemFormats: object expected");
                    message.itemFormats = {};
                    for (var keys = Object.keys(object.itemFormats), i = 0; i < keys.length; ++i) {
                        if (typeof object.itemFormats[keys[i]] !== "object")
                            throw TypeError(".dam.v1.TargetAdapter.itemFormats: object expected");
                        message.itemFormats[keys[i]] = $root.dam.v1.ItemFormat.fromObject(object.itemFormats[keys[i]]);
                    }
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.TargetAdapter.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a TargetAdapter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.TargetAdapter
             * @static
             * @param {dam.v1.TargetAdapter} message TargetAdapter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TargetAdapter.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.itemFormats = {};
                    object.ui = {};
                }
                if (options.defaults) {
                    object.platform = "";
                    object.requirements = null;
                    object.properties = null;
                }
                if (message.platform != null && message.hasOwnProperty("platform"))
                    object.platform = message.platform;
                if (message.requirements != null && message.hasOwnProperty("requirements"))
                    object.requirements = $root.dam.v1.TargetAdapter.Requirements.toObject(message.requirements, options);
                if (message.properties != null && message.hasOwnProperty("properties"))
                    object.properties = $root.dam.v1.TargetAdapter.Properties.toObject(message.properties, options);
                var keys2;
                if (message.itemFormats && (keys2 = Object.keys(message.itemFormats)).length) {
                    object.itemFormats = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.itemFormats[keys2[j]] = $root.dam.v1.ItemFormat.toObject(message.itemFormats[keys2[j]], options);
                }
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this TargetAdapter to JSON.
             * @function toJSON
             * @memberof dam.v1.TargetAdapter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TargetAdapter.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            TargetAdapter.Requirements = (function() {

                /**
                 * Properties of a Requirements.
                 * @memberof dam.v1.TargetAdapter
                 * @interface IRequirements
                 * @property {boolean|null} [targetRole] Requirements targetRole
                 * @property {boolean|null} [targetScope] Requirements targetScope
                 * @property {boolean|null} [aud] Requirements aud
                 */

                /**
                 * Constructs a new Requirements.
                 * @memberof dam.v1.TargetAdapter
                 * @classdesc Represents a Requirements.
                 * @implements IRequirements
                 * @constructor
                 * @param {dam.v1.TargetAdapter.IRequirements=} [properties] Properties to set
                 */
                function Requirements(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Requirements targetRole.
                 * @member {boolean} targetRole
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @instance
                 */
                Requirements.prototype.targetRole = false;

                /**
                 * Requirements targetScope.
                 * @member {boolean} targetScope
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @instance
                 */
                Requirements.prototype.targetScope = false;

                /**
                 * Requirements aud.
                 * @member {boolean} aud
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @instance
                 */
                Requirements.prototype.aud = false;

                /**
                 * Creates a new Requirements instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {dam.v1.TargetAdapter.IRequirements=} [properties] Properties to set
                 * @returns {dam.v1.TargetAdapter.Requirements} Requirements instance
                 */
                Requirements.create = function create(properties) {
                    return new Requirements(properties);
                };

                /**
                 * Encodes the specified Requirements message. Does not implicitly {@link dam.v1.TargetAdapter.Requirements.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {dam.v1.TargetAdapter.IRequirements} message Requirements message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Requirements.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.targetRole != null && message.hasOwnProperty("targetRole"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.targetRole);
                    if (message.targetScope != null && message.hasOwnProperty("targetScope"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.targetScope);
                    if (message.aud != null && message.hasOwnProperty("aud"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.aud);
                    return writer;
                };

                /**
                 * Encodes the specified Requirements message, length delimited. Does not implicitly {@link dam.v1.TargetAdapter.Requirements.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {dam.v1.TargetAdapter.IRequirements} message Requirements message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Requirements.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Requirements message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.TargetAdapter.Requirements} Requirements
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Requirements.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TargetAdapter.Requirements();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.targetRole = reader.bool();
                            break;
                        case 2:
                            message.targetScope = reader.bool();
                            break;
                        case 3:
                            message.aud = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Requirements message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.TargetAdapter.Requirements} Requirements
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Requirements.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Requirements message.
                 * @function verify
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Requirements.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.targetRole != null && message.hasOwnProperty("targetRole"))
                        if (typeof message.targetRole !== "boolean")
                            return "targetRole: boolean expected";
                    if (message.targetScope != null && message.hasOwnProperty("targetScope"))
                        if (typeof message.targetScope !== "boolean")
                            return "targetScope: boolean expected";
                    if (message.aud != null && message.hasOwnProperty("aud"))
                        if (typeof message.aud !== "boolean")
                            return "aud: boolean expected";
                    return null;
                };

                /**
                 * Creates a Requirements message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.TargetAdapter.Requirements} Requirements
                 */
                Requirements.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.TargetAdapter.Requirements)
                        return object;
                    var message = new $root.dam.v1.TargetAdapter.Requirements();
                    if (object.targetRole != null)
                        message.targetRole = Boolean(object.targetRole);
                    if (object.targetScope != null)
                        message.targetScope = Boolean(object.targetScope);
                    if (object.aud != null)
                        message.aud = Boolean(object.aud);
                    return message;
                };

                /**
                 * Creates a plain object from a Requirements message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @static
                 * @param {dam.v1.TargetAdapter.Requirements} message Requirements
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Requirements.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.targetRole = false;
                        object.targetScope = false;
                        object.aud = false;
                    }
                    if (message.targetRole != null && message.hasOwnProperty("targetRole"))
                        object.targetRole = message.targetRole;
                    if (message.targetScope != null && message.hasOwnProperty("targetScope"))
                        object.targetScope = message.targetScope;
                    if (message.aud != null && message.hasOwnProperty("aud"))
                        object.aud = message.aud;
                    return object;
                };

                /**
                 * Converts this Requirements to JSON.
                 * @function toJSON
                 * @memberof dam.v1.TargetAdapter.Requirements
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Requirements.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Requirements;
            })();

            TargetAdapter.Properties = (function() {

                /**
                 * Properties of a Properties.
                 * @memberof dam.v1.TargetAdapter
                 * @interface IProperties
                 * @property {boolean|null} [isAggregate] Properties isAggregate
                 * @property {boolean|null} [canBeAggregated] Properties canBeAggregated
                 * @property {boolean|null} [singleItem] Properties singleItem
                 */

                /**
                 * Constructs a new Properties.
                 * @memberof dam.v1.TargetAdapter
                 * @classdesc Represents a Properties.
                 * @implements IProperties
                 * @constructor
                 * @param {dam.v1.TargetAdapter.IProperties=} [properties] Properties to set
                 */
                function Properties(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Properties isAggregate.
                 * @member {boolean} isAggregate
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @instance
                 */
                Properties.prototype.isAggregate = false;

                /**
                 * Properties canBeAggregated.
                 * @member {boolean} canBeAggregated
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @instance
                 */
                Properties.prototype.canBeAggregated = false;

                /**
                 * Properties singleItem.
                 * @member {boolean} singleItem
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @instance
                 */
                Properties.prototype.singleItem = false;

                /**
                 * Creates a new Properties instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {dam.v1.TargetAdapter.IProperties=} [properties] Properties to set
                 * @returns {dam.v1.TargetAdapter.Properties} Properties instance
                 */
                Properties.create = function create(properties) {
                    return new Properties(properties);
                };

                /**
                 * Encodes the specified Properties message. Does not implicitly {@link dam.v1.TargetAdapter.Properties.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {dam.v1.TargetAdapter.IProperties} message Properties message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Properties.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.isAggregate != null && message.hasOwnProperty("isAggregate"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isAggregate);
                    if (message.canBeAggregated != null && message.hasOwnProperty("canBeAggregated"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.canBeAggregated);
                    if (message.singleItem != null && message.hasOwnProperty("singleItem"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.singleItem);
                    return writer;
                };

                /**
                 * Encodes the specified Properties message, length delimited. Does not implicitly {@link dam.v1.TargetAdapter.Properties.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {dam.v1.TargetAdapter.IProperties} message Properties message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Properties.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Properties message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.TargetAdapter.Properties} Properties
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Properties.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TargetAdapter.Properties();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.isAggregate = reader.bool();
                            break;
                        case 2:
                            message.canBeAggregated = reader.bool();
                            break;
                        case 3:
                            message.singleItem = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Properties message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.TargetAdapter.Properties} Properties
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Properties.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Properties message.
                 * @function verify
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Properties.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.isAggregate != null && message.hasOwnProperty("isAggregate"))
                        if (typeof message.isAggregate !== "boolean")
                            return "isAggregate: boolean expected";
                    if (message.canBeAggregated != null && message.hasOwnProperty("canBeAggregated"))
                        if (typeof message.canBeAggregated !== "boolean")
                            return "canBeAggregated: boolean expected";
                    if (message.singleItem != null && message.hasOwnProperty("singleItem"))
                        if (typeof message.singleItem !== "boolean")
                            return "singleItem: boolean expected";
                    return null;
                };

                /**
                 * Creates a Properties message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.TargetAdapter.Properties} Properties
                 */
                Properties.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.TargetAdapter.Properties)
                        return object;
                    var message = new $root.dam.v1.TargetAdapter.Properties();
                    if (object.isAggregate != null)
                        message.isAggregate = Boolean(object.isAggregate);
                    if (object.canBeAggregated != null)
                        message.canBeAggregated = Boolean(object.canBeAggregated);
                    if (object.singleItem != null)
                        message.singleItem = Boolean(object.singleItem);
                    return message;
                };

                /**
                 * Creates a plain object from a Properties message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @static
                 * @param {dam.v1.TargetAdapter.Properties} message Properties
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Properties.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.isAggregate = false;
                        object.canBeAggregated = false;
                        object.singleItem = false;
                    }
                    if (message.isAggregate != null && message.hasOwnProperty("isAggregate"))
                        object.isAggregate = message.isAggregate;
                    if (message.canBeAggregated != null && message.hasOwnProperty("canBeAggregated"))
                        object.canBeAggregated = message.canBeAggregated;
                    if (message.singleItem != null && message.hasOwnProperty("singleItem"))
                        object.singleItem = message.singleItem;
                    return object;
                };

                /**
                 * Converts this Properties to JSON.
                 * @function toJSON
                 * @memberof dam.v1.TargetAdapter.Properties
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Properties.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Properties;
            })();

            return TargetAdapter;
        })();

        v1.ItemFormat = (function() {

            /**
             * Properties of an ItemFormat.
             * @memberof dam.v1
             * @interface IItemFormat
             * @property {Object.<string,dam.v1.IVariableFormat>|null} [variables] ItemFormat variables
             * @property {Object.<string,string>|null} [ui] ItemFormat ui
             */

            /**
             * Constructs a new ItemFormat.
             * @memberof dam.v1
             * @classdesc Represents an ItemFormat.
             * @implements IItemFormat
             * @constructor
             * @param {dam.v1.IItemFormat=} [properties] Properties to set
             */
            function ItemFormat(properties) {
                this.variables = {};
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ItemFormat variables.
             * @member {Object.<string,dam.v1.IVariableFormat>} variables
             * @memberof dam.v1.ItemFormat
             * @instance
             */
            ItemFormat.prototype.variables = $util.emptyObject;

            /**
             * ItemFormat ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.ItemFormat
             * @instance
             */
            ItemFormat.prototype.ui = $util.emptyObject;

            /**
             * Creates a new ItemFormat instance using the specified properties.
             * @function create
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {dam.v1.IItemFormat=} [properties] Properties to set
             * @returns {dam.v1.ItemFormat} ItemFormat instance
             */
            ItemFormat.create = function create(properties) {
                return new ItemFormat(properties);
            };

            /**
             * Encodes the specified ItemFormat message. Does not implicitly {@link dam.v1.ItemFormat.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {dam.v1.IItemFormat} message ItemFormat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ItemFormat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.variables != null && message.hasOwnProperty("variables"))
                    for (var keys = Object.keys(message.variables), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.VariableFormat.encode(message.variables[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ItemFormat message, length delimited. Does not implicitly {@link dam.v1.ItemFormat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {dam.v1.IItemFormat} message ItemFormat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ItemFormat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ItemFormat message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ItemFormat} ItemFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ItemFormat.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ItemFormat(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.variables === $util.emptyObject)
                            message.variables = {};
                        key = reader.string();
                        reader.pos++;
                        message.variables[key] = $root.dam.v1.VariableFormat.decode(reader, reader.uint32());
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ItemFormat message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ItemFormat} ItemFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ItemFormat.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ItemFormat message.
             * @function verify
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ItemFormat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.variables != null && message.hasOwnProperty("variables")) {
                    if (!$util.isObject(message.variables))
                        return "variables: object expected";
                    var key = Object.keys(message.variables);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.VariableFormat.verify(message.variables[key[i]]);
                        if (error)
                            return "variables." + error;
                    }
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates an ItemFormat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ItemFormat} ItemFormat
             */
            ItemFormat.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ItemFormat)
                    return object;
                var message = new $root.dam.v1.ItemFormat();
                if (object.variables) {
                    if (typeof object.variables !== "object")
                        throw TypeError(".dam.v1.ItemFormat.variables: object expected");
                    message.variables = {};
                    for (var keys = Object.keys(object.variables), i = 0; i < keys.length; ++i) {
                        if (typeof object.variables[keys[i]] !== "object")
                            throw TypeError(".dam.v1.ItemFormat.variables: object expected");
                        message.variables[keys[i]] = $root.dam.v1.VariableFormat.fromObject(object.variables[keys[i]]);
                    }
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.ItemFormat.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from an ItemFormat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ItemFormat
             * @static
             * @param {dam.v1.ItemFormat} message ItemFormat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ItemFormat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.variables = {};
                    object.ui = {};
                }
                var keys2;
                if (message.variables && (keys2 = Object.keys(message.variables)).length) {
                    object.variables = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.variables[keys2[j]] = $root.dam.v1.VariableFormat.toObject(message.variables[keys2[j]], options);
                }
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this ItemFormat to JSON.
             * @function toJSON
             * @memberof dam.v1.ItemFormat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ItemFormat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ItemFormat;
        })();

        v1.VariableFormat = (function() {

            /**
             * Properties of a VariableFormat.
             * @memberof dam.v1
             * @interface IVariableFormat
             * @property {string|null} [regexp] VariableFormat regexp
             * @property {boolean|null} [optional] VariableFormat optional
             * @property {Object.<string,string>|null} [ui] VariableFormat ui
             */

            /**
             * Constructs a new VariableFormat.
             * @memberof dam.v1
             * @classdesc Represents a VariableFormat.
             * @implements IVariableFormat
             * @constructor
             * @param {dam.v1.IVariableFormat=} [properties] Properties to set
             */
            function VariableFormat(properties) {
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VariableFormat regexp.
             * @member {string} regexp
             * @memberof dam.v1.VariableFormat
             * @instance
             */
            VariableFormat.prototype.regexp = "";

            /**
             * VariableFormat optional.
             * @member {boolean} optional
             * @memberof dam.v1.VariableFormat
             * @instance
             */
            VariableFormat.prototype.optional = false;

            /**
             * VariableFormat ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.VariableFormat
             * @instance
             */
            VariableFormat.prototype.ui = $util.emptyObject;

            /**
             * Creates a new VariableFormat instance using the specified properties.
             * @function create
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {dam.v1.IVariableFormat=} [properties] Properties to set
             * @returns {dam.v1.VariableFormat} VariableFormat instance
             */
            VariableFormat.create = function create(properties) {
                return new VariableFormat(properties);
            };

            /**
             * Encodes the specified VariableFormat message. Does not implicitly {@link dam.v1.VariableFormat.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {dam.v1.IVariableFormat} message VariableFormat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VariableFormat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.regexp != null && message.hasOwnProperty("regexp"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.regexp);
                if (message.optional != null && message.hasOwnProperty("optional"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.optional);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified VariableFormat message, length delimited. Does not implicitly {@link dam.v1.VariableFormat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {dam.v1.IVariableFormat} message VariableFormat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VariableFormat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VariableFormat message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.VariableFormat} VariableFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VariableFormat.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.VariableFormat(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.regexp = reader.string();
                        break;
                    case 2:
                        message.optional = reader.bool();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VariableFormat message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.VariableFormat} VariableFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VariableFormat.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VariableFormat message.
             * @function verify
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VariableFormat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.regexp != null && message.hasOwnProperty("regexp"))
                    if (!$util.isString(message.regexp))
                        return "regexp: string expected";
                if (message.optional != null && message.hasOwnProperty("optional"))
                    if (typeof message.optional !== "boolean")
                        return "optional: boolean expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a VariableFormat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.VariableFormat} VariableFormat
             */
            VariableFormat.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.VariableFormat)
                    return object;
                var message = new $root.dam.v1.VariableFormat();
                if (object.regexp != null)
                    message.regexp = String(object.regexp);
                if (object.optional != null)
                    message.optional = Boolean(object.optional);
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.VariableFormat.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a VariableFormat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.VariableFormat
             * @static
             * @param {dam.v1.VariableFormat} message VariableFormat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VariableFormat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ui = {};
                if (options.defaults) {
                    object.regexp = "";
                    object.optional = false;
                }
                if (message.regexp != null && message.hasOwnProperty("regexp"))
                    object.regexp = message.regexp;
                if (message.optional != null && message.hasOwnProperty("optional"))
                    object.optional = message.optional;
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this VariableFormat to JSON.
             * @function toJSON
             * @memberof dam.v1.VariableFormat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VariableFormat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return VariableFormat;
        })();

        v1.Realm = (function() {

            /**
             * Properties of a Realm.
             * @memberof dam.v1
             * @interface IRealm
             */

            /**
             * Constructs a new Realm.
             * @memberof dam.v1
             * @classdesc Represents a Realm.
             * @implements IRealm
             * @constructor
             * @param {dam.v1.IRealm=} [properties] Properties to set
             */
            function Realm(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Realm instance using the specified properties.
             * @function create
             * @memberof dam.v1.Realm
             * @static
             * @param {dam.v1.IRealm=} [properties] Properties to set
             * @returns {dam.v1.Realm} Realm instance
             */
            Realm.create = function create(properties) {
                return new Realm(properties);
            };

            /**
             * Encodes the specified Realm message. Does not implicitly {@link dam.v1.Realm.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.Realm
             * @static
             * @param {dam.v1.IRealm} message Realm message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Realm.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Realm message, length delimited. Does not implicitly {@link dam.v1.Realm.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.Realm
             * @static
             * @param {dam.v1.IRealm} message Realm message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Realm.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Realm message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.Realm
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.Realm} Realm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Realm.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.Realm();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Realm message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.Realm
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.Realm} Realm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Realm.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Realm message.
             * @function verify
             * @memberof dam.v1.Realm
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Realm.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a Realm message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.Realm
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.Realm} Realm
             */
            Realm.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.Realm)
                    return object;
                return new $root.dam.v1.Realm();
            };

            /**
             * Creates a plain object from a Realm message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.Realm
             * @static
             * @param {dam.v1.Realm} message Realm
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Realm.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Realm to JSON.
             * @function toJSON
             * @memberof dam.v1.Realm
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Realm.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Realm;
        })();

        v1.PassportTranslator = (function() {

            /**
             * Properties of a PassportTranslator.
             * @memberof dam.v1
             * @interface IPassportTranslator
             * @property {Array.<string>|null} [compatibleIssuers] PassportTranslator compatibleIssuers
             * @property {Object.<string,string>|null} [ui] PassportTranslator ui
             */

            /**
             * Constructs a new PassportTranslator.
             * @memberof dam.v1
             * @classdesc Represents a PassportTranslator.
             * @implements IPassportTranslator
             * @constructor
             * @param {dam.v1.IPassportTranslator=} [properties] Properties to set
             */
            function PassportTranslator(properties) {
                this.compatibleIssuers = [];
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PassportTranslator compatibleIssuers.
             * @member {Array.<string>} compatibleIssuers
             * @memberof dam.v1.PassportTranslator
             * @instance
             */
            PassportTranslator.prototype.compatibleIssuers = $util.emptyArray;

            /**
             * PassportTranslator ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.PassportTranslator
             * @instance
             */
            PassportTranslator.prototype.ui = $util.emptyObject;

            /**
             * Creates a new PassportTranslator instance using the specified properties.
             * @function create
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {dam.v1.IPassportTranslator=} [properties] Properties to set
             * @returns {dam.v1.PassportTranslator} PassportTranslator instance
             */
            PassportTranslator.create = function create(properties) {
                return new PassportTranslator(properties);
            };

            /**
             * Encodes the specified PassportTranslator message. Does not implicitly {@link dam.v1.PassportTranslator.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {dam.v1.IPassportTranslator} message PassportTranslator message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PassportTranslator.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.compatibleIssuers != null && message.compatibleIssuers.length)
                    for (var i = 0; i < message.compatibleIssuers.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.compatibleIssuers[i]);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified PassportTranslator message, length delimited. Does not implicitly {@link dam.v1.PassportTranslator.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {dam.v1.IPassportTranslator} message PassportTranslator message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PassportTranslator.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PassportTranslator message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.PassportTranslator} PassportTranslator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PassportTranslator.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.PassportTranslator(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.compatibleIssuers && message.compatibleIssuers.length))
                            message.compatibleIssuers = [];
                        message.compatibleIssuers.push(reader.string());
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PassportTranslator message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.PassportTranslator} PassportTranslator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PassportTranslator.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PassportTranslator message.
             * @function verify
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PassportTranslator.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.compatibleIssuers != null && message.hasOwnProperty("compatibleIssuers")) {
                    if (!Array.isArray(message.compatibleIssuers))
                        return "compatibleIssuers: array expected";
                    for (var i = 0; i < message.compatibleIssuers.length; ++i)
                        if (!$util.isString(message.compatibleIssuers[i]))
                            return "compatibleIssuers: string[] expected";
                }
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a PassportTranslator message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.PassportTranslator} PassportTranslator
             */
            PassportTranslator.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.PassportTranslator)
                    return object;
                var message = new $root.dam.v1.PassportTranslator();
                if (object.compatibleIssuers) {
                    if (!Array.isArray(object.compatibleIssuers))
                        throw TypeError(".dam.v1.PassportTranslator.compatibleIssuers: array expected");
                    message.compatibleIssuers = [];
                    for (var i = 0; i < object.compatibleIssuers.length; ++i)
                        message.compatibleIssuers[i] = String(object.compatibleIssuers[i]);
                }
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.PassportTranslator.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a PassportTranslator message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.PassportTranslator
             * @static
             * @param {dam.v1.PassportTranslator} message PassportTranslator
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PassportTranslator.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.compatibleIssuers = [];
                if (options.objects || options.defaults)
                    object.ui = {};
                if (message.compatibleIssuers && message.compatibleIssuers.length) {
                    object.compatibleIssuers = [];
                    for (var j = 0; j < message.compatibleIssuers.length; ++j)
                        object.compatibleIssuers[j] = message.compatibleIssuers[j];
                }
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this PassportTranslator to JSON.
             * @function toJSON
             * @memberof dam.v1.PassportTranslator
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PassportTranslator.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PassportTranslator;
        })();

        v1.GetInfoRequest = (function() {

            /**
             * Properties of a GetInfoRequest.
             * @memberof dam.v1
             * @interface IGetInfoRequest
             */

            /**
             * Constructs a new GetInfoRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetInfoRequest.
             * @implements IGetInfoRequest
             * @constructor
             * @param {dam.v1.IGetInfoRequest=} [properties] Properties to set
             */
            function GetInfoRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetInfoRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {dam.v1.IGetInfoRequest=} [properties] Properties to set
             * @returns {dam.v1.GetInfoRequest} GetInfoRequest instance
             */
            GetInfoRequest.create = function create(properties) {
                return new GetInfoRequest(properties);
            };

            /**
             * Encodes the specified GetInfoRequest message. Does not implicitly {@link dam.v1.GetInfoRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {dam.v1.IGetInfoRequest} message GetInfoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetInfoRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetInfoRequest message, length delimited. Does not implicitly {@link dam.v1.GetInfoRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {dam.v1.IGetInfoRequest} message GetInfoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetInfoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetInfoRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetInfoRequest} GetInfoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetInfoRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetInfoRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetInfoRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetInfoRequest} GetInfoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetInfoRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetInfoRequest message.
             * @function verify
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetInfoRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetInfoRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetInfoRequest} GetInfoRequest
             */
            GetInfoRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetInfoRequest)
                    return object;
                return new $root.dam.v1.GetInfoRequest();
            };

            /**
             * Creates a plain object from a GetInfoRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetInfoRequest
             * @static
             * @param {dam.v1.GetInfoRequest} message GetInfoRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetInfoRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetInfoRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetInfoRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetInfoRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetInfoRequest;
        })();

        v1.GetInfoResponse = (function() {

            /**
             * Properties of a GetInfoResponse.
             * @memberof dam.v1
             * @interface IGetInfoResponse
             * @property {string|null} [name] GetInfoResponse name
             * @property {Array.<string>|null} [versions] GetInfoResponse versions
             * @property {number|Long|null} [startTime] GetInfoResponse startTime
             */

            /**
             * Constructs a new GetInfoResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetInfoResponse.
             * @implements IGetInfoResponse
             * @constructor
             * @param {dam.v1.IGetInfoResponse=} [properties] Properties to set
             */
            function GetInfoResponse(properties) {
                this.versions = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetInfoResponse name.
             * @member {string} name
             * @memberof dam.v1.GetInfoResponse
             * @instance
             */
            GetInfoResponse.prototype.name = "";

            /**
             * GetInfoResponse versions.
             * @member {Array.<string>} versions
             * @memberof dam.v1.GetInfoResponse
             * @instance
             */
            GetInfoResponse.prototype.versions = $util.emptyArray;

            /**
             * GetInfoResponse startTime.
             * @member {number|Long} startTime
             * @memberof dam.v1.GetInfoResponse
             * @instance
             */
            GetInfoResponse.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new GetInfoResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {dam.v1.IGetInfoResponse=} [properties] Properties to set
             * @returns {dam.v1.GetInfoResponse} GetInfoResponse instance
             */
            GetInfoResponse.create = function create(properties) {
                return new GetInfoResponse(properties);
            };

            /**
             * Encodes the specified GetInfoResponse message. Does not implicitly {@link dam.v1.GetInfoResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {dam.v1.IGetInfoResponse} message GetInfoResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetInfoResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.versions != null && message.versions.length)
                    for (var i = 0; i < message.versions.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.versions[i]);
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.startTime);
                return writer;
            };

            /**
             * Encodes the specified GetInfoResponse message, length delimited. Does not implicitly {@link dam.v1.GetInfoResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {dam.v1.IGetInfoResponse} message GetInfoResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetInfoResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetInfoResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetInfoResponse} GetInfoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetInfoResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetInfoResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        if (!(message.versions && message.versions.length))
                            message.versions = [];
                        message.versions.push(reader.string());
                        break;
                    case 3:
                        message.startTime = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetInfoResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetInfoResponse} GetInfoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetInfoResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetInfoResponse message.
             * @function verify
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetInfoResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.versions != null && message.hasOwnProperty("versions")) {
                    if (!Array.isArray(message.versions))
                        return "versions: array expected";
                    for (var i = 0; i < message.versions.length; ++i)
                        if (!$util.isString(message.versions[i]))
                            return "versions: string[] expected";
                }
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                        return "startTime: integer|Long expected";
                return null;
            };

            /**
             * Creates a GetInfoResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetInfoResponse} GetInfoResponse
             */
            GetInfoResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetInfoResponse)
                    return object;
                var message = new $root.dam.v1.GetInfoResponse();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.versions) {
                    if (!Array.isArray(object.versions))
                        throw TypeError(".dam.v1.GetInfoResponse.versions: array expected");
                    message.versions = [];
                    for (var i = 0; i < object.versions.length; ++i)
                        message.versions[i] = String(object.versions[i]);
                }
                if (object.startTime != null)
                    if ($util.Long)
                        (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                    else if (typeof object.startTime === "string")
                        message.startTime = parseInt(object.startTime, 10);
                    else if (typeof object.startTime === "number")
                        message.startTime = object.startTime;
                    else if (typeof object.startTime === "object")
                        message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a GetInfoResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetInfoResponse
             * @static
             * @param {dam.v1.GetInfoResponse} message GetInfoResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetInfoResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.versions = [];
                if (options.defaults) {
                    object.name = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.startTime = options.longs === String ? "0" : 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.versions && message.versions.length) {
                    object.versions = [];
                    for (var j = 0; j < message.versions.length; ++j)
                        object.versions[j] = message.versions[j];
                }
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    if (typeof message.startTime === "number")
                        object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                    else
                        object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
                return object;
            };

            /**
             * Converts this GetInfoResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetInfoResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetInfoResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetInfoResponse;
        })();

        v1.RealmRequest = (function() {

            /**
             * Properties of a RealmRequest.
             * @memberof dam.v1
             * @interface IRealmRequest
             * @property {dam.v1.IRealm|null} [item] RealmRequest item
             */

            /**
             * Constructs a new RealmRequest.
             * @memberof dam.v1
             * @classdesc Represents a RealmRequest.
             * @implements IRealmRequest
             * @constructor
             * @param {dam.v1.IRealmRequest=} [properties] Properties to set
             */
            function RealmRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RealmRequest item.
             * @member {dam.v1.IRealm|null|undefined} item
             * @memberof dam.v1.RealmRequest
             * @instance
             */
            RealmRequest.prototype.item = null;

            /**
             * Creates a new RealmRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {dam.v1.IRealmRequest=} [properties] Properties to set
             * @returns {dam.v1.RealmRequest} RealmRequest instance
             */
            RealmRequest.create = function create(properties) {
                return new RealmRequest(properties);
            };

            /**
             * Encodes the specified RealmRequest message. Does not implicitly {@link dam.v1.RealmRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {dam.v1.IRealmRequest} message RealmRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RealmRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.Realm.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RealmRequest message, length delimited. Does not implicitly {@link dam.v1.RealmRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {dam.v1.IRealmRequest} message RealmRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RealmRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RealmRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.RealmRequest} RealmRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RealmRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.RealmRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.Realm.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RealmRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.RealmRequest} RealmRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RealmRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RealmRequest message.
             * @function verify
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RealmRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.Realm.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                return null;
            };

            /**
             * Creates a RealmRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.RealmRequest} RealmRequest
             */
            RealmRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.RealmRequest)
                    return object;
                var message = new $root.dam.v1.RealmRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.RealmRequest.item: object expected");
                    message.item = $root.dam.v1.Realm.fromObject(object.item);
                }
                return message;
            };

            /**
             * Creates a plain object from a RealmRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.RealmRequest
             * @static
             * @param {dam.v1.RealmRequest} message RealmRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RealmRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.item = null;
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.Realm.toObject(message.item, options);
                return object;
            };

            /**
             * Converts this RealmRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.RealmRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RealmRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RealmRequest;
        })();

        v1.RealmResponse = (function() {

            /**
             * Properties of a RealmResponse.
             * @memberof dam.v1
             * @interface IRealmResponse
             */

            /**
             * Constructs a new RealmResponse.
             * @memberof dam.v1
             * @classdesc Represents a RealmResponse.
             * @implements IRealmResponse
             * @constructor
             * @param {dam.v1.IRealmResponse=} [properties] Properties to set
             */
            function RealmResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new RealmResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {dam.v1.IRealmResponse=} [properties] Properties to set
             * @returns {dam.v1.RealmResponse} RealmResponse instance
             */
            RealmResponse.create = function create(properties) {
                return new RealmResponse(properties);
            };

            /**
             * Encodes the specified RealmResponse message. Does not implicitly {@link dam.v1.RealmResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {dam.v1.IRealmResponse} message RealmResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RealmResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified RealmResponse message, length delimited. Does not implicitly {@link dam.v1.RealmResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {dam.v1.IRealmResponse} message RealmResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RealmResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RealmResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.RealmResponse} RealmResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RealmResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.RealmResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RealmResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.RealmResponse} RealmResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RealmResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RealmResponse message.
             * @function verify
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RealmResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a RealmResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.RealmResponse} RealmResponse
             */
            RealmResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.RealmResponse)
                    return object;
                return new $root.dam.v1.RealmResponse();
            };

            /**
             * Creates a plain object from a RealmResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.RealmResponse
             * @static
             * @param {dam.v1.RealmResponse} message RealmResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RealmResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this RealmResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.RealmResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RealmResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RealmResponse;
        })();

        v1.GetResourcesRequest = (function() {

            /**
             * Properties of a GetResourcesRequest.
             * @memberof dam.v1
             * @interface IGetResourcesRequest
             * @property {string|null} [filter] GetResourcesRequest filter
             * @property {string|null} [include] GetResourcesRequest include
             */

            /**
             * Constructs a new GetResourcesRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetResourcesRequest.
             * @implements IGetResourcesRequest
             * @constructor
             * @param {dam.v1.IGetResourcesRequest=} [properties] Properties to set
             */
            function GetResourcesRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetResourcesRequest filter.
             * @member {string} filter
             * @memberof dam.v1.GetResourcesRequest
             * @instance
             */
            GetResourcesRequest.prototype.filter = "";

            /**
             * GetResourcesRequest include.
             * @member {string} include
             * @memberof dam.v1.GetResourcesRequest
             * @instance
             */
            GetResourcesRequest.prototype.include = "";

            /**
             * Creates a new GetResourcesRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {dam.v1.IGetResourcesRequest=} [properties] Properties to set
             * @returns {dam.v1.GetResourcesRequest} GetResourcesRequest instance
             */
            GetResourcesRequest.create = function create(properties) {
                return new GetResourcesRequest(properties);
            };

            /**
             * Encodes the specified GetResourcesRequest message. Does not implicitly {@link dam.v1.GetResourcesRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {dam.v1.IGetResourcesRequest} message GetResourcesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourcesRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.filter != null && message.hasOwnProperty("filter"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.filter);
                if (message.include != null && message.hasOwnProperty("include"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.include);
                return writer;
            };

            /**
             * Encodes the specified GetResourcesRequest message, length delimited. Does not implicitly {@link dam.v1.GetResourcesRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {dam.v1.IGetResourcesRequest} message GetResourcesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourcesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetResourcesRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetResourcesRequest} GetResourcesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourcesRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetResourcesRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.filter = reader.string();
                        break;
                    case 2:
                        message.include = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetResourcesRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetResourcesRequest} GetResourcesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourcesRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetResourcesRequest message.
             * @function verify
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetResourcesRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.filter != null && message.hasOwnProperty("filter"))
                    if (!$util.isString(message.filter))
                        return "filter: string expected";
                if (message.include != null && message.hasOwnProperty("include"))
                    if (!$util.isString(message.include))
                        return "include: string expected";
                return null;
            };

            /**
             * Creates a GetResourcesRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetResourcesRequest} GetResourcesRequest
             */
            GetResourcesRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetResourcesRequest)
                    return object;
                var message = new $root.dam.v1.GetResourcesRequest();
                if (object.filter != null)
                    message.filter = String(object.filter);
                if (object.include != null)
                    message.include = String(object.include);
                return message;
            };

            /**
             * Creates a plain object from a GetResourcesRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetResourcesRequest
             * @static
             * @param {dam.v1.GetResourcesRequest} message GetResourcesRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetResourcesRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.filter = "";
                    object.include = "";
                }
                if (message.filter != null && message.hasOwnProperty("filter"))
                    object.filter = message.filter;
                if (message.include != null && message.hasOwnProperty("include"))
                    object.include = message.include;
                return object;
            };

            /**
             * Converts this GetResourcesRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetResourcesRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetResourcesRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetResourcesRequest;
        })();

        v1.GetResourcesResponse = (function() {

            /**
             * Properties of a GetResourcesResponse.
             * @memberof dam.v1
             * @interface IGetResourcesResponse
             * @property {Object.<string,dam.v1.IResource>|null} [resources] GetResourcesResponse resources
             */

            /**
             * Constructs a new GetResourcesResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetResourcesResponse.
             * @implements IGetResourcesResponse
             * @constructor
             * @param {dam.v1.IGetResourcesResponse=} [properties] Properties to set
             */
            function GetResourcesResponse(properties) {
                this.resources = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetResourcesResponse resources.
             * @member {Object.<string,dam.v1.IResource>} resources
             * @memberof dam.v1.GetResourcesResponse
             * @instance
             */
            GetResourcesResponse.prototype.resources = $util.emptyObject;

            /**
             * Creates a new GetResourcesResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {dam.v1.IGetResourcesResponse=} [properties] Properties to set
             * @returns {dam.v1.GetResourcesResponse} GetResourcesResponse instance
             */
            GetResourcesResponse.create = function create(properties) {
                return new GetResourcesResponse(properties);
            };

            /**
             * Encodes the specified GetResourcesResponse message. Does not implicitly {@link dam.v1.GetResourcesResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {dam.v1.IGetResourcesResponse} message GetResourcesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourcesResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.resources != null && message.hasOwnProperty("resources"))
                    for (var keys = Object.keys(message.resources), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.Resource.encode(message.resources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified GetResourcesResponse message, length delimited. Does not implicitly {@link dam.v1.GetResourcesResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {dam.v1.IGetResourcesResponse} message GetResourcesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourcesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetResourcesResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetResourcesResponse} GetResourcesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourcesResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetResourcesResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.resources === $util.emptyObject)
                            message.resources = {};
                        key = reader.string();
                        reader.pos++;
                        message.resources[key] = $root.dam.v1.Resource.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetResourcesResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetResourcesResponse} GetResourcesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourcesResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetResourcesResponse message.
             * @function verify
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetResourcesResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.resources != null && message.hasOwnProperty("resources")) {
                    if (!$util.isObject(message.resources))
                        return "resources: object expected";
                    var key = Object.keys(message.resources);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.Resource.verify(message.resources[key[i]]);
                        if (error)
                            return "resources." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetResourcesResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetResourcesResponse} GetResourcesResponse
             */
            GetResourcesResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetResourcesResponse)
                    return object;
                var message = new $root.dam.v1.GetResourcesResponse();
                if (object.resources) {
                    if (typeof object.resources !== "object")
                        throw TypeError(".dam.v1.GetResourcesResponse.resources: object expected");
                    message.resources = {};
                    for (var keys = Object.keys(object.resources), i = 0; i < keys.length; ++i) {
                        if (typeof object.resources[keys[i]] !== "object")
                            throw TypeError(".dam.v1.GetResourcesResponse.resources: object expected");
                        message.resources[keys[i]] = $root.dam.v1.Resource.fromObject(object.resources[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetResourcesResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetResourcesResponse
             * @static
             * @param {dam.v1.GetResourcesResponse} message GetResourcesResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetResourcesResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.resources = {};
                var keys2;
                if (message.resources && (keys2 = Object.keys(message.resources)).length) {
                    object.resources = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.resources[keys2[j]] = $root.dam.v1.Resource.toObject(message.resources[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this GetResourcesResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetResourcesResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetResourcesResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetResourcesResponse;
        })();

        v1.GetFlatViewsRequest = (function() {

            /**
             * Properties of a GetFlatViewsRequest.
             * @memberof dam.v1
             * @interface IGetFlatViewsRequest
             */

            /**
             * Constructs a new GetFlatViewsRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetFlatViewsRequest.
             * @implements IGetFlatViewsRequest
             * @constructor
             * @param {dam.v1.IGetFlatViewsRequest=} [properties] Properties to set
             */
            function GetFlatViewsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetFlatViewsRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {dam.v1.IGetFlatViewsRequest=} [properties] Properties to set
             * @returns {dam.v1.GetFlatViewsRequest} GetFlatViewsRequest instance
             */
            GetFlatViewsRequest.create = function create(properties) {
                return new GetFlatViewsRequest(properties);
            };

            /**
             * Encodes the specified GetFlatViewsRequest message. Does not implicitly {@link dam.v1.GetFlatViewsRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {dam.v1.IGetFlatViewsRequest} message GetFlatViewsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetFlatViewsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetFlatViewsRequest message, length delimited. Does not implicitly {@link dam.v1.GetFlatViewsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {dam.v1.IGetFlatViewsRequest} message GetFlatViewsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetFlatViewsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetFlatViewsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetFlatViewsRequest} GetFlatViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetFlatViewsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetFlatViewsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetFlatViewsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetFlatViewsRequest} GetFlatViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetFlatViewsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetFlatViewsRequest message.
             * @function verify
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetFlatViewsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetFlatViewsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetFlatViewsRequest} GetFlatViewsRequest
             */
            GetFlatViewsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetFlatViewsRequest)
                    return object;
                return new $root.dam.v1.GetFlatViewsRequest();
            };

            /**
             * Creates a plain object from a GetFlatViewsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetFlatViewsRequest
             * @static
             * @param {dam.v1.GetFlatViewsRequest} message GetFlatViewsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetFlatViewsRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetFlatViewsRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetFlatViewsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetFlatViewsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetFlatViewsRequest;
        })();

        v1.GetFlatViewsResponse = (function() {

            /**
             * Properties of a GetFlatViewsResponse.
             * @memberof dam.v1
             * @interface IGetFlatViewsResponse
             * @property {Object.<string,dam.v1.GetFlatViewsResponse.IFlatView>|null} [views] GetFlatViewsResponse views
             */

            /**
             * Constructs a new GetFlatViewsResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetFlatViewsResponse.
             * @implements IGetFlatViewsResponse
             * @constructor
             * @param {dam.v1.IGetFlatViewsResponse=} [properties] Properties to set
             */
            function GetFlatViewsResponse(properties) {
                this.views = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetFlatViewsResponse views.
             * @member {Object.<string,dam.v1.GetFlatViewsResponse.IFlatView>} views
             * @memberof dam.v1.GetFlatViewsResponse
             * @instance
             */
            GetFlatViewsResponse.prototype.views = $util.emptyObject;

            /**
             * Creates a new GetFlatViewsResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {dam.v1.IGetFlatViewsResponse=} [properties] Properties to set
             * @returns {dam.v1.GetFlatViewsResponse} GetFlatViewsResponse instance
             */
            GetFlatViewsResponse.create = function create(properties) {
                return new GetFlatViewsResponse(properties);
            };

            /**
             * Encodes the specified GetFlatViewsResponse message. Does not implicitly {@link dam.v1.GetFlatViewsResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {dam.v1.IGetFlatViewsResponse} message GetFlatViewsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetFlatViewsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.views != null && message.hasOwnProperty("views"))
                    for (var keys = Object.keys(message.views), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.GetFlatViewsResponse.FlatView.encode(message.views[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified GetFlatViewsResponse message, length delimited. Does not implicitly {@link dam.v1.GetFlatViewsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {dam.v1.IGetFlatViewsResponse} message GetFlatViewsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetFlatViewsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetFlatViewsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetFlatViewsResponse} GetFlatViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetFlatViewsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetFlatViewsResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.views === $util.emptyObject)
                            message.views = {};
                        key = reader.string();
                        reader.pos++;
                        message.views[key] = $root.dam.v1.GetFlatViewsResponse.FlatView.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetFlatViewsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetFlatViewsResponse} GetFlatViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetFlatViewsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetFlatViewsResponse message.
             * @function verify
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetFlatViewsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.views != null && message.hasOwnProperty("views")) {
                    if (!$util.isObject(message.views))
                        return "views: object expected";
                    var key = Object.keys(message.views);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.GetFlatViewsResponse.FlatView.verify(message.views[key[i]]);
                        if (error)
                            return "views." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetFlatViewsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetFlatViewsResponse} GetFlatViewsResponse
             */
            GetFlatViewsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetFlatViewsResponse)
                    return object;
                var message = new $root.dam.v1.GetFlatViewsResponse();
                if (object.views) {
                    if (typeof object.views !== "object")
                        throw TypeError(".dam.v1.GetFlatViewsResponse.views: object expected");
                    message.views = {};
                    for (var keys = Object.keys(object.views), i = 0; i < keys.length; ++i) {
                        if (typeof object.views[keys[i]] !== "object")
                            throw TypeError(".dam.v1.GetFlatViewsResponse.views: object expected");
                        message.views[keys[i]] = $root.dam.v1.GetFlatViewsResponse.FlatView.fromObject(object.views[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetFlatViewsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetFlatViewsResponse
             * @static
             * @param {dam.v1.GetFlatViewsResponse} message GetFlatViewsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetFlatViewsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.views = {};
                var keys2;
                if (message.views && (keys2 = Object.keys(message.views)).length) {
                    object.views = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.views[keys2[j]] = $root.dam.v1.GetFlatViewsResponse.FlatView.toObject(message.views[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this GetFlatViewsResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetFlatViewsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetFlatViewsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            GetFlatViewsResponse.FlatView = (function() {

                /**
                 * Properties of a FlatView.
                 * @memberof dam.v1.GetFlatViewsResponse
                 * @interface IFlatView
                 * @property {string|null} [resourcePath] FlatView resourcePath
                 * @property {string|null} [umbrella] FlatView umbrella
                 * @property {string|null} [resourceName] FlatView resourceName
                 * @property {string|null} [viewName] FlatView viewName
                 * @property {string|null} [roleName] FlatView roleName
                 * @property {string|null} [interfaceName] FlatView interfaceName
                 * @property {string|null} [interfaceUri] FlatView interfaceUri
                 * @property {string|null} [contentType] FlatView contentType
                 * @property {string|null} [version] FlatView version
                 * @property {string|null} [topic] FlatView topic
                 * @property {string|null} [partition] FlatView partition
                 * @property {string|null} [fidelity] FlatView fidelity
                 * @property {string|null} [geoLocation] FlatView geoLocation
                 * @property {string|null} [targetAdapter] FlatView targetAdapter
                 * @property {string|null} [platform] FlatView platform
                 * @property {string|null} [platformService] FlatView platformService
                 * @property {string|null} [maxTokenTtl] FlatView maxTokenTtl
                 * @property {Object.<string,string>|null} [resourceUi] FlatView resourceUi
                 * @property {Object.<string,string>|null} [viewUi] FlatView viewUi
                 * @property {Object.<string,string>|null} [roleUi] FlatView roleUi
                 */

                /**
                 * Constructs a new FlatView.
                 * @memberof dam.v1.GetFlatViewsResponse
                 * @classdesc Represents a FlatView.
                 * @implements IFlatView
                 * @constructor
                 * @param {dam.v1.GetFlatViewsResponse.IFlatView=} [properties] Properties to set
                 */
                function FlatView(properties) {
                    this.resourceUi = {};
                    this.viewUi = {};
                    this.roleUi = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FlatView resourcePath.
                 * @member {string} resourcePath
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.resourcePath = "";

                /**
                 * FlatView umbrella.
                 * @member {string} umbrella
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.umbrella = "";

                /**
                 * FlatView resourceName.
                 * @member {string} resourceName
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.resourceName = "";

                /**
                 * FlatView viewName.
                 * @member {string} viewName
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.viewName = "";

                /**
                 * FlatView roleName.
                 * @member {string} roleName
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.roleName = "";

                /**
                 * FlatView interfaceName.
                 * @member {string} interfaceName
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.interfaceName = "";

                /**
                 * FlatView interfaceUri.
                 * @member {string} interfaceUri
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.interfaceUri = "";

                /**
                 * FlatView contentType.
                 * @member {string} contentType
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.contentType = "";

                /**
                 * FlatView version.
                 * @member {string} version
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.version = "";

                /**
                 * FlatView topic.
                 * @member {string} topic
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.topic = "";

                /**
                 * FlatView partition.
                 * @member {string} partition
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.partition = "";

                /**
                 * FlatView fidelity.
                 * @member {string} fidelity
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.fidelity = "";

                /**
                 * FlatView geoLocation.
                 * @member {string} geoLocation
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.geoLocation = "";

                /**
                 * FlatView targetAdapter.
                 * @member {string} targetAdapter
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.targetAdapter = "";

                /**
                 * FlatView platform.
                 * @member {string} platform
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.platform = "";

                /**
                 * FlatView platformService.
                 * @member {string} platformService
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.platformService = "";

                /**
                 * FlatView maxTokenTtl.
                 * @member {string} maxTokenTtl
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.maxTokenTtl = "";

                /**
                 * FlatView resourceUi.
                 * @member {Object.<string,string>} resourceUi
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.resourceUi = $util.emptyObject;

                /**
                 * FlatView viewUi.
                 * @member {Object.<string,string>} viewUi
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.viewUi = $util.emptyObject;

                /**
                 * FlatView roleUi.
                 * @member {Object.<string,string>} roleUi
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 */
                FlatView.prototype.roleUi = $util.emptyObject;

                /**
                 * Creates a new FlatView instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {dam.v1.GetFlatViewsResponse.IFlatView=} [properties] Properties to set
                 * @returns {dam.v1.GetFlatViewsResponse.FlatView} FlatView instance
                 */
                FlatView.create = function create(properties) {
                    return new FlatView(properties);
                };

                /**
                 * Encodes the specified FlatView message. Does not implicitly {@link dam.v1.GetFlatViewsResponse.FlatView.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {dam.v1.GetFlatViewsResponse.IFlatView} message FlatView message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FlatView.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.resourcePath != null && message.hasOwnProperty("resourcePath"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.resourcePath);
                    if (message.umbrella != null && message.hasOwnProperty("umbrella"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.umbrella);
                    if (message.resourceName != null && message.hasOwnProperty("resourceName"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.resourceName);
                    if (message.viewName != null && message.hasOwnProperty("viewName"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.viewName);
                    if (message.roleName != null && message.hasOwnProperty("roleName"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.roleName);
                    if (message.interfaceName != null && message.hasOwnProperty("interfaceName"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.interfaceName);
                    if (message.interfaceUri != null && message.hasOwnProperty("interfaceUri"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.interfaceUri);
                    if (message.contentType != null && message.hasOwnProperty("contentType"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.contentType);
                    if (message.version != null && message.hasOwnProperty("version"))
                        writer.uint32(/* id 9, wireType 2 =*/74).string(message.version);
                    if (message.topic != null && message.hasOwnProperty("topic"))
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.topic);
                    if (message.partition != null && message.hasOwnProperty("partition"))
                        writer.uint32(/* id 11, wireType 2 =*/90).string(message.partition);
                    if (message.fidelity != null && message.hasOwnProperty("fidelity"))
                        writer.uint32(/* id 12, wireType 2 =*/98).string(message.fidelity);
                    if (message.geoLocation != null && message.hasOwnProperty("geoLocation"))
                        writer.uint32(/* id 13, wireType 2 =*/106).string(message.geoLocation);
                    if (message.targetAdapter != null && message.hasOwnProperty("targetAdapter"))
                        writer.uint32(/* id 14, wireType 2 =*/114).string(message.targetAdapter);
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        writer.uint32(/* id 15, wireType 2 =*/122).string(message.platform);
                    if (message.platformService != null && message.hasOwnProperty("platformService"))
                        writer.uint32(/* id 16, wireType 2 =*/130).string(message.platformService);
                    if (message.maxTokenTtl != null && message.hasOwnProperty("maxTokenTtl"))
                        writer.uint32(/* id 17, wireType 2 =*/138).string(message.maxTokenTtl);
                    if (message.resourceUi != null && message.hasOwnProperty("resourceUi"))
                        for (var keys = Object.keys(message.resourceUi), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 18, wireType 2 =*/146).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.resourceUi[keys[i]]).ldelim();
                    if (message.viewUi != null && message.hasOwnProperty("viewUi"))
                        for (var keys = Object.keys(message.viewUi), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 19, wireType 2 =*/154).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.viewUi[keys[i]]).ldelim();
                    if (message.roleUi != null && message.hasOwnProperty("roleUi"))
                        for (var keys = Object.keys(message.roleUi), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 20, wireType 2 =*/162).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.roleUi[keys[i]]).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified FlatView message, length delimited. Does not implicitly {@link dam.v1.GetFlatViewsResponse.FlatView.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {dam.v1.GetFlatViewsResponse.IFlatView} message FlatView message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FlatView.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a FlatView message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.GetFlatViewsResponse.FlatView} FlatView
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FlatView.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetFlatViewsResponse.FlatView(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.resourcePath = reader.string();
                            break;
                        case 2:
                            message.umbrella = reader.string();
                            break;
                        case 3:
                            message.resourceName = reader.string();
                            break;
                        case 4:
                            message.viewName = reader.string();
                            break;
                        case 5:
                            message.roleName = reader.string();
                            break;
                        case 6:
                            message.interfaceName = reader.string();
                            break;
                        case 7:
                            message.interfaceUri = reader.string();
                            break;
                        case 8:
                            message.contentType = reader.string();
                            break;
                        case 9:
                            message.version = reader.string();
                            break;
                        case 10:
                            message.topic = reader.string();
                            break;
                        case 11:
                            message.partition = reader.string();
                            break;
                        case 12:
                            message.fidelity = reader.string();
                            break;
                        case 13:
                            message.geoLocation = reader.string();
                            break;
                        case 14:
                            message.targetAdapter = reader.string();
                            break;
                        case 15:
                            message.platform = reader.string();
                            break;
                        case 16:
                            message.platformService = reader.string();
                            break;
                        case 17:
                            message.maxTokenTtl = reader.string();
                            break;
                        case 18:
                            reader.skip().pos++;
                            if (message.resourceUi === $util.emptyObject)
                                message.resourceUi = {};
                            key = reader.string();
                            reader.pos++;
                            message.resourceUi[key] = reader.string();
                            break;
                        case 19:
                            reader.skip().pos++;
                            if (message.viewUi === $util.emptyObject)
                                message.viewUi = {};
                            key = reader.string();
                            reader.pos++;
                            message.viewUi[key] = reader.string();
                            break;
                        case 20:
                            reader.skip().pos++;
                            if (message.roleUi === $util.emptyObject)
                                message.roleUi = {};
                            key = reader.string();
                            reader.pos++;
                            message.roleUi[key] = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a FlatView message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.GetFlatViewsResponse.FlatView} FlatView
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FlatView.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FlatView message.
                 * @function verify
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FlatView.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.resourcePath != null && message.hasOwnProperty("resourcePath"))
                        if (!$util.isString(message.resourcePath))
                            return "resourcePath: string expected";
                    if (message.umbrella != null && message.hasOwnProperty("umbrella"))
                        if (!$util.isString(message.umbrella))
                            return "umbrella: string expected";
                    if (message.resourceName != null && message.hasOwnProperty("resourceName"))
                        if (!$util.isString(message.resourceName))
                            return "resourceName: string expected";
                    if (message.viewName != null && message.hasOwnProperty("viewName"))
                        if (!$util.isString(message.viewName))
                            return "viewName: string expected";
                    if (message.roleName != null && message.hasOwnProperty("roleName"))
                        if (!$util.isString(message.roleName))
                            return "roleName: string expected";
                    if (message.interfaceName != null && message.hasOwnProperty("interfaceName"))
                        if (!$util.isString(message.interfaceName))
                            return "interfaceName: string expected";
                    if (message.interfaceUri != null && message.hasOwnProperty("interfaceUri"))
                        if (!$util.isString(message.interfaceUri))
                            return "interfaceUri: string expected";
                    if (message.contentType != null && message.hasOwnProperty("contentType"))
                        if (!$util.isString(message.contentType))
                            return "contentType: string expected";
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isString(message.version))
                            return "version: string expected";
                    if (message.topic != null && message.hasOwnProperty("topic"))
                        if (!$util.isString(message.topic))
                            return "topic: string expected";
                    if (message.partition != null && message.hasOwnProperty("partition"))
                        if (!$util.isString(message.partition))
                            return "partition: string expected";
                    if (message.fidelity != null && message.hasOwnProperty("fidelity"))
                        if (!$util.isString(message.fidelity))
                            return "fidelity: string expected";
                    if (message.geoLocation != null && message.hasOwnProperty("geoLocation"))
                        if (!$util.isString(message.geoLocation))
                            return "geoLocation: string expected";
                    if (message.targetAdapter != null && message.hasOwnProperty("targetAdapter"))
                        if (!$util.isString(message.targetAdapter))
                            return "targetAdapter: string expected";
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        if (!$util.isString(message.platform))
                            return "platform: string expected";
                    if (message.platformService != null && message.hasOwnProperty("platformService"))
                        if (!$util.isString(message.platformService))
                            return "platformService: string expected";
                    if (message.maxTokenTtl != null && message.hasOwnProperty("maxTokenTtl"))
                        if (!$util.isString(message.maxTokenTtl))
                            return "maxTokenTtl: string expected";
                    if (message.resourceUi != null && message.hasOwnProperty("resourceUi")) {
                        if (!$util.isObject(message.resourceUi))
                            return "resourceUi: object expected";
                        var key = Object.keys(message.resourceUi);
                        for (var i = 0; i < key.length; ++i)
                            if (!$util.isString(message.resourceUi[key[i]]))
                                return "resourceUi: string{k:string} expected";
                    }
                    if (message.viewUi != null && message.hasOwnProperty("viewUi")) {
                        if (!$util.isObject(message.viewUi))
                            return "viewUi: object expected";
                        var key = Object.keys(message.viewUi);
                        for (var i = 0; i < key.length; ++i)
                            if (!$util.isString(message.viewUi[key[i]]))
                                return "viewUi: string{k:string} expected";
                    }
                    if (message.roleUi != null && message.hasOwnProperty("roleUi")) {
                        if (!$util.isObject(message.roleUi))
                            return "roleUi: object expected";
                        var key = Object.keys(message.roleUi);
                        for (var i = 0; i < key.length; ++i)
                            if (!$util.isString(message.roleUi[key[i]]))
                                return "roleUi: string{k:string} expected";
                    }
                    return null;
                };

                /**
                 * Creates a FlatView message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.GetFlatViewsResponse.FlatView} FlatView
                 */
                FlatView.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.GetFlatViewsResponse.FlatView)
                        return object;
                    var message = new $root.dam.v1.GetFlatViewsResponse.FlatView();
                    if (object.resourcePath != null)
                        message.resourcePath = String(object.resourcePath);
                    if (object.umbrella != null)
                        message.umbrella = String(object.umbrella);
                    if (object.resourceName != null)
                        message.resourceName = String(object.resourceName);
                    if (object.viewName != null)
                        message.viewName = String(object.viewName);
                    if (object.roleName != null)
                        message.roleName = String(object.roleName);
                    if (object.interfaceName != null)
                        message.interfaceName = String(object.interfaceName);
                    if (object.interfaceUri != null)
                        message.interfaceUri = String(object.interfaceUri);
                    if (object.contentType != null)
                        message.contentType = String(object.contentType);
                    if (object.version != null)
                        message.version = String(object.version);
                    if (object.topic != null)
                        message.topic = String(object.topic);
                    if (object.partition != null)
                        message.partition = String(object.partition);
                    if (object.fidelity != null)
                        message.fidelity = String(object.fidelity);
                    if (object.geoLocation != null)
                        message.geoLocation = String(object.geoLocation);
                    if (object.targetAdapter != null)
                        message.targetAdapter = String(object.targetAdapter);
                    if (object.platform != null)
                        message.platform = String(object.platform);
                    if (object.platformService != null)
                        message.platformService = String(object.platformService);
                    if (object.maxTokenTtl != null)
                        message.maxTokenTtl = String(object.maxTokenTtl);
                    if (object.resourceUi) {
                        if (typeof object.resourceUi !== "object")
                            throw TypeError(".dam.v1.GetFlatViewsResponse.FlatView.resourceUi: object expected");
                        message.resourceUi = {};
                        for (var keys = Object.keys(object.resourceUi), i = 0; i < keys.length; ++i)
                            message.resourceUi[keys[i]] = String(object.resourceUi[keys[i]]);
                    }
                    if (object.viewUi) {
                        if (typeof object.viewUi !== "object")
                            throw TypeError(".dam.v1.GetFlatViewsResponse.FlatView.viewUi: object expected");
                        message.viewUi = {};
                        for (var keys = Object.keys(object.viewUi), i = 0; i < keys.length; ++i)
                            message.viewUi[keys[i]] = String(object.viewUi[keys[i]]);
                    }
                    if (object.roleUi) {
                        if (typeof object.roleUi !== "object")
                            throw TypeError(".dam.v1.GetFlatViewsResponse.FlatView.roleUi: object expected");
                        message.roleUi = {};
                        for (var keys = Object.keys(object.roleUi), i = 0; i < keys.length; ++i)
                            message.roleUi[keys[i]] = String(object.roleUi[keys[i]]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a FlatView message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @static
                 * @param {dam.v1.GetFlatViewsResponse.FlatView} message FlatView
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FlatView.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults) {
                        object.resourceUi = {};
                        object.viewUi = {};
                        object.roleUi = {};
                    }
                    if (options.defaults) {
                        object.resourcePath = "";
                        object.umbrella = "";
                        object.resourceName = "";
                        object.viewName = "";
                        object.roleName = "";
                        object.interfaceName = "";
                        object.interfaceUri = "";
                        object.contentType = "";
                        object.version = "";
                        object.topic = "";
                        object.partition = "";
                        object.fidelity = "";
                        object.geoLocation = "";
                        object.targetAdapter = "";
                        object.platform = "";
                        object.platformService = "";
                        object.maxTokenTtl = "";
                    }
                    if (message.resourcePath != null && message.hasOwnProperty("resourcePath"))
                        object.resourcePath = message.resourcePath;
                    if (message.umbrella != null && message.hasOwnProperty("umbrella"))
                        object.umbrella = message.umbrella;
                    if (message.resourceName != null && message.hasOwnProperty("resourceName"))
                        object.resourceName = message.resourceName;
                    if (message.viewName != null && message.hasOwnProperty("viewName"))
                        object.viewName = message.viewName;
                    if (message.roleName != null && message.hasOwnProperty("roleName"))
                        object.roleName = message.roleName;
                    if (message.interfaceName != null && message.hasOwnProperty("interfaceName"))
                        object.interfaceName = message.interfaceName;
                    if (message.interfaceUri != null && message.hasOwnProperty("interfaceUri"))
                        object.interfaceUri = message.interfaceUri;
                    if (message.contentType != null && message.hasOwnProperty("contentType"))
                        object.contentType = message.contentType;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    if (message.topic != null && message.hasOwnProperty("topic"))
                        object.topic = message.topic;
                    if (message.partition != null && message.hasOwnProperty("partition"))
                        object.partition = message.partition;
                    if (message.fidelity != null && message.hasOwnProperty("fidelity"))
                        object.fidelity = message.fidelity;
                    if (message.geoLocation != null && message.hasOwnProperty("geoLocation"))
                        object.geoLocation = message.geoLocation;
                    if (message.targetAdapter != null && message.hasOwnProperty("targetAdapter"))
                        object.targetAdapter = message.targetAdapter;
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        object.platform = message.platform;
                    if (message.platformService != null && message.hasOwnProperty("platformService"))
                        object.platformService = message.platformService;
                    if (message.maxTokenTtl != null && message.hasOwnProperty("maxTokenTtl"))
                        object.maxTokenTtl = message.maxTokenTtl;
                    var keys2;
                    if (message.resourceUi && (keys2 = Object.keys(message.resourceUi)).length) {
                        object.resourceUi = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.resourceUi[keys2[j]] = message.resourceUi[keys2[j]];
                    }
                    if (message.viewUi && (keys2 = Object.keys(message.viewUi)).length) {
                        object.viewUi = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.viewUi[keys2[j]] = message.viewUi[keys2[j]];
                    }
                    if (message.roleUi && (keys2 = Object.keys(message.roleUi)).length) {
                        object.roleUi = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.roleUi[keys2[j]] = message.roleUi[keys2[j]];
                    }
                    return object;
                };

                /**
                 * Converts this FlatView to JSON.
                 * @function toJSON
                 * @memberof dam.v1.GetFlatViewsResponse.FlatView
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FlatView.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return FlatView;
            })();

            return GetFlatViewsResponse;
        })();

        v1.GetResourceRequest = (function() {

            /**
             * Properties of a GetResourceRequest.
             * @memberof dam.v1
             * @interface IGetResourceRequest
             */

            /**
             * Constructs a new GetResourceRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetResourceRequest.
             * @implements IGetResourceRequest
             * @constructor
             * @param {dam.v1.IGetResourceRequest=} [properties] Properties to set
             */
            function GetResourceRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetResourceRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {dam.v1.IGetResourceRequest=} [properties] Properties to set
             * @returns {dam.v1.GetResourceRequest} GetResourceRequest instance
             */
            GetResourceRequest.create = function create(properties) {
                return new GetResourceRequest(properties);
            };

            /**
             * Encodes the specified GetResourceRequest message. Does not implicitly {@link dam.v1.GetResourceRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {dam.v1.IGetResourceRequest} message GetResourceRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourceRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetResourceRequest message, length delimited. Does not implicitly {@link dam.v1.GetResourceRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {dam.v1.IGetResourceRequest} message GetResourceRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetResourceRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetResourceRequest} GetResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourceRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetResourceRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetResourceRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetResourceRequest} GetResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourceRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetResourceRequest message.
             * @function verify
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetResourceRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetResourceRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetResourceRequest} GetResourceRequest
             */
            GetResourceRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetResourceRequest)
                    return object;
                return new $root.dam.v1.GetResourceRequest();
            };

            /**
             * Creates a plain object from a GetResourceRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetResourceRequest
             * @static
             * @param {dam.v1.GetResourceRequest} message GetResourceRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetResourceRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetResourceRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetResourceRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetResourceRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetResourceRequest;
        })();

        v1.GetResourceResponse = (function() {

            /**
             * Properties of a GetResourceResponse.
             * @memberof dam.v1
             * @interface IGetResourceResponse
             * @property {dam.v1.IResource|null} [resource] GetResourceResponse resource
             * @property {Array.<string>|null} [access] GetResourceResponse access
             */

            /**
             * Constructs a new GetResourceResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetResourceResponse.
             * @implements IGetResourceResponse
             * @constructor
             * @param {dam.v1.IGetResourceResponse=} [properties] Properties to set
             */
            function GetResourceResponse(properties) {
                this.access = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetResourceResponse resource.
             * @member {dam.v1.IResource|null|undefined} resource
             * @memberof dam.v1.GetResourceResponse
             * @instance
             */
            GetResourceResponse.prototype.resource = null;

            /**
             * GetResourceResponse access.
             * @member {Array.<string>} access
             * @memberof dam.v1.GetResourceResponse
             * @instance
             */
            GetResourceResponse.prototype.access = $util.emptyArray;

            /**
             * Creates a new GetResourceResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {dam.v1.IGetResourceResponse=} [properties] Properties to set
             * @returns {dam.v1.GetResourceResponse} GetResourceResponse instance
             */
            GetResourceResponse.create = function create(properties) {
                return new GetResourceResponse(properties);
            };

            /**
             * Encodes the specified GetResourceResponse message. Does not implicitly {@link dam.v1.GetResourceResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {dam.v1.IGetResourceResponse} message GetResourceResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourceResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.resource != null && message.hasOwnProperty("resource"))
                    $root.dam.v1.Resource.encode(message.resource, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.access != null && message.access.length)
                    for (var i = 0; i < message.access.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.access[i]);
                return writer;
            };

            /**
             * Encodes the specified GetResourceResponse message, length delimited. Does not implicitly {@link dam.v1.GetResourceResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {dam.v1.IGetResourceResponse} message GetResourceResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetResourceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetResourceResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetResourceResponse} GetResourceResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourceResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetResourceResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.resource = $root.dam.v1.Resource.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.access && message.access.length))
                            message.access = [];
                        message.access.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetResourceResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetResourceResponse} GetResourceResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetResourceResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetResourceResponse message.
             * @function verify
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetResourceResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                    var error = $root.dam.v1.Resource.verify(message.resource);
                    if (error)
                        return "resource." + error;
                }
                if (message.access != null && message.hasOwnProperty("access")) {
                    if (!Array.isArray(message.access))
                        return "access: array expected";
                    for (var i = 0; i < message.access.length; ++i)
                        if (!$util.isString(message.access[i]))
                            return "access: string[] expected";
                }
                return null;
            };

            /**
             * Creates a GetResourceResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetResourceResponse} GetResourceResponse
             */
            GetResourceResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetResourceResponse)
                    return object;
                var message = new $root.dam.v1.GetResourceResponse();
                if (object.resource != null) {
                    if (typeof object.resource !== "object")
                        throw TypeError(".dam.v1.GetResourceResponse.resource: object expected");
                    message.resource = $root.dam.v1.Resource.fromObject(object.resource);
                }
                if (object.access) {
                    if (!Array.isArray(object.access))
                        throw TypeError(".dam.v1.GetResourceResponse.access: array expected");
                    message.access = [];
                    for (var i = 0; i < object.access.length; ++i)
                        message.access[i] = String(object.access[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetResourceResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetResourceResponse
             * @static
             * @param {dam.v1.GetResourceResponse} message GetResourceResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetResourceResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.access = [];
                if (options.defaults)
                    object.resource = null;
                if (message.resource != null && message.hasOwnProperty("resource"))
                    object.resource = $root.dam.v1.Resource.toObject(message.resource, options);
                if (message.access && message.access.length) {
                    object.access = [];
                    for (var j = 0; j < message.access.length; ++j)
                        object.access[j] = message.access[j];
                }
                return object;
            };

            /**
             * Converts this GetResourceResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetResourceResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetResourceResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetResourceResponse;
        })();

        v1.GetViewsRequest = (function() {

            /**
             * Properties of a GetViewsRequest.
             * @memberof dam.v1
             * @interface IGetViewsRequest
             */

            /**
             * Constructs a new GetViewsRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetViewsRequest.
             * @implements IGetViewsRequest
             * @constructor
             * @param {dam.v1.IGetViewsRequest=} [properties] Properties to set
             */
            function GetViewsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetViewsRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {dam.v1.IGetViewsRequest=} [properties] Properties to set
             * @returns {dam.v1.GetViewsRequest} GetViewsRequest instance
             */
            GetViewsRequest.create = function create(properties) {
                return new GetViewsRequest(properties);
            };

            /**
             * Encodes the specified GetViewsRequest message. Does not implicitly {@link dam.v1.GetViewsRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {dam.v1.IGetViewsRequest} message GetViewsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetViewsRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {dam.v1.IGetViewsRequest} message GetViewsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewsRequest} GetViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewsRequest} GetViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewsRequest message.
             * @function verify
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetViewsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewsRequest} GetViewsRequest
             */
            GetViewsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewsRequest)
                    return object;
                return new $root.dam.v1.GetViewsRequest();
            };

            /**
             * Creates a plain object from a GetViewsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewsRequest
             * @static
             * @param {dam.v1.GetViewsRequest} message GetViewsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewsRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetViewsRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewsRequest;
        })();

        v1.GetViewsResponse = (function() {

            /**
             * Properties of a GetViewsResponse.
             * @memberof dam.v1
             * @interface IGetViewsResponse
             * @property {Object.<string,dam.v1.IView>|null} [views] GetViewsResponse views
             * @property {Array.<string>|null} [access] GetViewsResponse access
             */

            /**
             * Constructs a new GetViewsResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetViewsResponse.
             * @implements IGetViewsResponse
             * @constructor
             * @param {dam.v1.IGetViewsResponse=} [properties] Properties to set
             */
            function GetViewsResponse(properties) {
                this.views = {};
                this.access = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetViewsResponse views.
             * @member {Object.<string,dam.v1.IView>} views
             * @memberof dam.v1.GetViewsResponse
             * @instance
             */
            GetViewsResponse.prototype.views = $util.emptyObject;

            /**
             * GetViewsResponse access.
             * @member {Array.<string>} access
             * @memberof dam.v1.GetViewsResponse
             * @instance
             */
            GetViewsResponse.prototype.access = $util.emptyArray;

            /**
             * Creates a new GetViewsResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {dam.v1.IGetViewsResponse=} [properties] Properties to set
             * @returns {dam.v1.GetViewsResponse} GetViewsResponse instance
             */
            GetViewsResponse.create = function create(properties) {
                return new GetViewsResponse(properties);
            };

            /**
             * Encodes the specified GetViewsResponse message. Does not implicitly {@link dam.v1.GetViewsResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {dam.v1.IGetViewsResponse} message GetViewsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.views != null && message.hasOwnProperty("views"))
                    for (var keys = Object.keys(message.views), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.View.encode(message.views[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.access != null && message.access.length)
                    for (var i = 0; i < message.access.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.access[i]);
                return writer;
            };

            /**
             * Encodes the specified GetViewsResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {dam.v1.IGetViewsResponse} message GetViewsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewsResponse} GetViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewsResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.views === $util.emptyObject)
                            message.views = {};
                        key = reader.string();
                        reader.pos++;
                        message.views[key] = $root.dam.v1.View.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.access && message.access.length))
                            message.access = [];
                        message.access.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewsResponse} GetViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewsResponse message.
             * @function verify
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.views != null && message.hasOwnProperty("views")) {
                    if (!$util.isObject(message.views))
                        return "views: object expected";
                    var key = Object.keys(message.views);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.View.verify(message.views[key[i]]);
                        if (error)
                            return "views." + error;
                    }
                }
                if (message.access != null && message.hasOwnProperty("access")) {
                    if (!Array.isArray(message.access))
                        return "access: array expected";
                    for (var i = 0; i < message.access.length; ++i)
                        if (!$util.isString(message.access[i]))
                            return "access: string[] expected";
                }
                return null;
            };

            /**
             * Creates a GetViewsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewsResponse} GetViewsResponse
             */
            GetViewsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewsResponse)
                    return object;
                var message = new $root.dam.v1.GetViewsResponse();
                if (object.views) {
                    if (typeof object.views !== "object")
                        throw TypeError(".dam.v1.GetViewsResponse.views: object expected");
                    message.views = {};
                    for (var keys = Object.keys(object.views), i = 0; i < keys.length; ++i) {
                        if (typeof object.views[keys[i]] !== "object")
                            throw TypeError(".dam.v1.GetViewsResponse.views: object expected");
                        message.views[keys[i]] = $root.dam.v1.View.fromObject(object.views[keys[i]]);
                    }
                }
                if (object.access) {
                    if (!Array.isArray(object.access))
                        throw TypeError(".dam.v1.GetViewsResponse.access: array expected");
                    message.access = [];
                    for (var i = 0; i < object.access.length; ++i)
                        message.access[i] = String(object.access[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetViewsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewsResponse
             * @static
             * @param {dam.v1.GetViewsResponse} message GetViewsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.access = [];
                if (options.objects || options.defaults)
                    object.views = {};
                var keys2;
                if (message.views && (keys2 = Object.keys(message.views)).length) {
                    object.views = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.views[keys2[j]] = $root.dam.v1.View.toObject(message.views[keys2[j]], options);
                }
                if (message.access && message.access.length) {
                    object.access = [];
                    for (var j = 0; j < message.access.length; ++j)
                        object.access[j] = message.access[j];
                }
                return object;
            };

            /**
             * Converts this GetViewsResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewsResponse;
        })();

        v1.GetViewRequest = (function() {

            /**
             * Properties of a GetViewRequest.
             * @memberof dam.v1
             * @interface IGetViewRequest
             */

            /**
             * Constructs a new GetViewRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetViewRequest.
             * @implements IGetViewRequest
             * @constructor
             * @param {dam.v1.IGetViewRequest=} [properties] Properties to set
             */
            function GetViewRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetViewRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {dam.v1.IGetViewRequest=} [properties] Properties to set
             * @returns {dam.v1.GetViewRequest} GetViewRequest instance
             */
            GetViewRequest.create = function create(properties) {
                return new GetViewRequest(properties);
            };

            /**
             * Encodes the specified GetViewRequest message. Does not implicitly {@link dam.v1.GetViewRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {dam.v1.IGetViewRequest} message GetViewRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetViewRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {dam.v1.IGetViewRequest} message GetViewRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewRequest} GetViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewRequest} GetViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewRequest message.
             * @function verify
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetViewRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewRequest} GetViewRequest
             */
            GetViewRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewRequest)
                    return object;
                return new $root.dam.v1.GetViewRequest();
            };

            /**
             * Creates a plain object from a GetViewRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewRequest
             * @static
             * @param {dam.v1.GetViewRequest} message GetViewRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetViewRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewRequest;
        })();

        v1.GetViewResponse = (function() {

            /**
             * Properties of a GetViewResponse.
             * @memberof dam.v1
             * @interface IGetViewResponse
             * @property {dam.v1.IView|null} [view] GetViewResponse view
             * @property {Array.<string>|null} [access] GetViewResponse access
             */

            /**
             * Constructs a new GetViewResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetViewResponse.
             * @implements IGetViewResponse
             * @constructor
             * @param {dam.v1.IGetViewResponse=} [properties] Properties to set
             */
            function GetViewResponse(properties) {
                this.access = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetViewResponse view.
             * @member {dam.v1.IView|null|undefined} view
             * @memberof dam.v1.GetViewResponse
             * @instance
             */
            GetViewResponse.prototype.view = null;

            /**
             * GetViewResponse access.
             * @member {Array.<string>} access
             * @memberof dam.v1.GetViewResponse
             * @instance
             */
            GetViewResponse.prototype.access = $util.emptyArray;

            /**
             * Creates a new GetViewResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {dam.v1.IGetViewResponse=} [properties] Properties to set
             * @returns {dam.v1.GetViewResponse} GetViewResponse instance
             */
            GetViewResponse.create = function create(properties) {
                return new GetViewResponse(properties);
            };

            /**
             * Encodes the specified GetViewResponse message. Does not implicitly {@link dam.v1.GetViewResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {dam.v1.IGetViewResponse} message GetViewResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.view != null && message.hasOwnProperty("view"))
                    $root.dam.v1.View.encode(message.view, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.access != null && message.access.length)
                    for (var i = 0; i < message.access.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.access[i]);
                return writer;
            };

            /**
             * Encodes the specified GetViewResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {dam.v1.IGetViewResponse} message GetViewResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewResponse} GetViewResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.view = $root.dam.v1.View.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.access && message.access.length))
                            message.access = [];
                        message.access.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewResponse} GetViewResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewResponse message.
             * @function verify
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.view != null && message.hasOwnProperty("view")) {
                    var error = $root.dam.v1.View.verify(message.view);
                    if (error)
                        return "view." + error;
                }
                if (message.access != null && message.hasOwnProperty("access")) {
                    if (!Array.isArray(message.access))
                        return "access: array expected";
                    for (var i = 0; i < message.access.length; ++i)
                        if (!$util.isString(message.access[i]))
                            return "access: string[] expected";
                }
                return null;
            };

            /**
             * Creates a GetViewResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewResponse} GetViewResponse
             */
            GetViewResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewResponse)
                    return object;
                var message = new $root.dam.v1.GetViewResponse();
                if (object.view != null) {
                    if (typeof object.view !== "object")
                        throw TypeError(".dam.v1.GetViewResponse.view: object expected");
                    message.view = $root.dam.v1.View.fromObject(object.view);
                }
                if (object.access) {
                    if (!Array.isArray(object.access))
                        throw TypeError(".dam.v1.GetViewResponse.access: array expected");
                    message.access = [];
                    for (var i = 0; i < object.access.length; ++i)
                        message.access[i] = String(object.access[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetViewResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewResponse
             * @static
             * @param {dam.v1.GetViewResponse} message GetViewResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.access = [];
                if (options.defaults)
                    object.view = null;
                if (message.view != null && message.hasOwnProperty("view"))
                    object.view = $root.dam.v1.View.toObject(message.view, options);
                if (message.access && message.access.length) {
                    object.access = [];
                    for (var j = 0; j < message.access.length; ++j)
                        object.access[j] = message.access[j];
                }
                return object;
            };

            /**
             * Converts this GetViewResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewResponse;
        })();

        v1.GetViewRolesRequest = (function() {

            /**
             * Properties of a GetViewRolesRequest.
             * @memberof dam.v1
             * @interface IGetViewRolesRequest
             */

            /**
             * Constructs a new GetViewRolesRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetViewRolesRequest.
             * @implements IGetViewRolesRequest
             * @constructor
             * @param {dam.v1.IGetViewRolesRequest=} [properties] Properties to set
             */
            function GetViewRolesRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetViewRolesRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {dam.v1.IGetViewRolesRequest=} [properties] Properties to set
             * @returns {dam.v1.GetViewRolesRequest} GetViewRolesRequest instance
             */
            GetViewRolesRequest.create = function create(properties) {
                return new GetViewRolesRequest(properties);
            };

            /**
             * Encodes the specified GetViewRolesRequest message. Does not implicitly {@link dam.v1.GetViewRolesRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {dam.v1.IGetViewRolesRequest} message GetViewRolesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRolesRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetViewRolesRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewRolesRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {dam.v1.IGetViewRolesRequest} message GetViewRolesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRolesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewRolesRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewRolesRequest} GetViewRolesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRolesRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewRolesRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewRolesRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewRolesRequest} GetViewRolesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRolesRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewRolesRequest message.
             * @function verify
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewRolesRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetViewRolesRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewRolesRequest} GetViewRolesRequest
             */
            GetViewRolesRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewRolesRequest)
                    return object;
                return new $root.dam.v1.GetViewRolesRequest();
            };

            /**
             * Creates a plain object from a GetViewRolesRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewRolesRequest
             * @static
             * @param {dam.v1.GetViewRolesRequest} message GetViewRolesRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewRolesRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetViewRolesRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewRolesRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewRolesRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewRolesRequest;
        })();

        v1.GetViewRolesResponse = (function() {

            /**
             * Properties of a GetViewRolesResponse.
             * @memberof dam.v1
             * @interface IGetViewRolesResponse
             * @property {Object.<string,dam.v1.IAccessRole>|null} [roles] GetViewRolesResponse roles
             * @property {Array.<string>|null} [access] GetViewRolesResponse access
             */

            /**
             * Constructs a new GetViewRolesResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetViewRolesResponse.
             * @implements IGetViewRolesResponse
             * @constructor
             * @param {dam.v1.IGetViewRolesResponse=} [properties] Properties to set
             */
            function GetViewRolesResponse(properties) {
                this.roles = {};
                this.access = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetViewRolesResponse roles.
             * @member {Object.<string,dam.v1.IAccessRole>} roles
             * @memberof dam.v1.GetViewRolesResponse
             * @instance
             */
            GetViewRolesResponse.prototype.roles = $util.emptyObject;

            /**
             * GetViewRolesResponse access.
             * @member {Array.<string>} access
             * @memberof dam.v1.GetViewRolesResponse
             * @instance
             */
            GetViewRolesResponse.prototype.access = $util.emptyArray;

            /**
             * Creates a new GetViewRolesResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {dam.v1.IGetViewRolesResponse=} [properties] Properties to set
             * @returns {dam.v1.GetViewRolesResponse} GetViewRolesResponse instance
             */
            GetViewRolesResponse.create = function create(properties) {
                return new GetViewRolesResponse(properties);
            };

            /**
             * Encodes the specified GetViewRolesResponse message. Does not implicitly {@link dam.v1.GetViewRolesResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {dam.v1.IGetViewRolesResponse} message GetViewRolesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRolesResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.roles != null && message.hasOwnProperty("roles"))
                    for (var keys = Object.keys(message.roles), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.AccessRole.encode(message.roles[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.access != null && message.access.length)
                    for (var i = 0; i < message.access.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.access[i]);
                return writer;
            };

            /**
             * Encodes the specified GetViewRolesResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewRolesResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {dam.v1.IGetViewRolesResponse} message GetViewRolesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRolesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewRolesResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewRolesResponse} GetViewRolesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRolesResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewRolesResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.roles === $util.emptyObject)
                            message.roles = {};
                        key = reader.string();
                        reader.pos++;
                        message.roles[key] = $root.dam.v1.AccessRole.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.access && message.access.length))
                            message.access = [];
                        message.access.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewRolesResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewRolesResponse} GetViewRolesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRolesResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewRolesResponse message.
             * @function verify
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewRolesResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.roles != null && message.hasOwnProperty("roles")) {
                    if (!$util.isObject(message.roles))
                        return "roles: object expected";
                    var key = Object.keys(message.roles);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.AccessRole.verify(message.roles[key[i]]);
                        if (error)
                            return "roles." + error;
                    }
                }
                if (message.access != null && message.hasOwnProperty("access")) {
                    if (!Array.isArray(message.access))
                        return "access: array expected";
                    for (var i = 0; i < message.access.length; ++i)
                        if (!$util.isString(message.access[i]))
                            return "access: string[] expected";
                }
                return null;
            };

            /**
             * Creates a GetViewRolesResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewRolesResponse} GetViewRolesResponse
             */
            GetViewRolesResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewRolesResponse)
                    return object;
                var message = new $root.dam.v1.GetViewRolesResponse();
                if (object.roles) {
                    if (typeof object.roles !== "object")
                        throw TypeError(".dam.v1.GetViewRolesResponse.roles: object expected");
                    message.roles = {};
                    for (var keys = Object.keys(object.roles), i = 0; i < keys.length; ++i) {
                        if (typeof object.roles[keys[i]] !== "object")
                            throw TypeError(".dam.v1.GetViewRolesResponse.roles: object expected");
                        message.roles[keys[i]] = $root.dam.v1.AccessRole.fromObject(object.roles[keys[i]]);
                    }
                }
                if (object.access) {
                    if (!Array.isArray(object.access))
                        throw TypeError(".dam.v1.GetViewRolesResponse.access: array expected");
                    message.access = [];
                    for (var i = 0; i < object.access.length; ++i)
                        message.access[i] = String(object.access[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetViewRolesResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewRolesResponse
             * @static
             * @param {dam.v1.GetViewRolesResponse} message GetViewRolesResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewRolesResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.access = [];
                if (options.objects || options.defaults)
                    object.roles = {};
                var keys2;
                if (message.roles && (keys2 = Object.keys(message.roles)).length) {
                    object.roles = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.roles[keys2[j]] = $root.dam.v1.AccessRole.toObject(message.roles[keys2[j]], options);
                }
                if (message.access && message.access.length) {
                    object.access = [];
                    for (var j = 0; j < message.access.length; ++j)
                        object.access[j] = message.access[j];
                }
                return object;
            };

            /**
             * Converts this GetViewRolesResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewRolesResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewRolesResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewRolesResponse;
        })();

        v1.GetViewRoleRequest = (function() {

            /**
             * Properties of a GetViewRoleRequest.
             * @memberof dam.v1
             * @interface IGetViewRoleRequest
             */

            /**
             * Constructs a new GetViewRoleRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetViewRoleRequest.
             * @implements IGetViewRoleRequest
             * @constructor
             * @param {dam.v1.IGetViewRoleRequest=} [properties] Properties to set
             */
            function GetViewRoleRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetViewRoleRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {dam.v1.IGetViewRoleRequest=} [properties] Properties to set
             * @returns {dam.v1.GetViewRoleRequest} GetViewRoleRequest instance
             */
            GetViewRoleRequest.create = function create(properties) {
                return new GetViewRoleRequest(properties);
            };

            /**
             * Encodes the specified GetViewRoleRequest message. Does not implicitly {@link dam.v1.GetViewRoleRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {dam.v1.IGetViewRoleRequest} message GetViewRoleRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRoleRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetViewRoleRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewRoleRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {dam.v1.IGetViewRoleRequest} message GetViewRoleRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRoleRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewRoleRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewRoleRequest} GetViewRoleRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRoleRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewRoleRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewRoleRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewRoleRequest} GetViewRoleRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRoleRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewRoleRequest message.
             * @function verify
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewRoleRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetViewRoleRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewRoleRequest} GetViewRoleRequest
             */
            GetViewRoleRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewRoleRequest)
                    return object;
                return new $root.dam.v1.GetViewRoleRequest();
            };

            /**
             * Creates a plain object from a GetViewRoleRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewRoleRequest
             * @static
             * @param {dam.v1.GetViewRoleRequest} message GetViewRoleRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewRoleRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetViewRoleRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewRoleRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewRoleRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewRoleRequest;
        })();

        v1.GetViewRoleResponse = (function() {

            /**
             * Properties of a GetViewRoleResponse.
             * @memberof dam.v1
             * @interface IGetViewRoleResponse
             * @property {dam.v1.IAccessRole|null} [role] GetViewRoleResponse role
             * @property {Array.<string>|null} [access] GetViewRoleResponse access
             */

            /**
             * Constructs a new GetViewRoleResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetViewRoleResponse.
             * @implements IGetViewRoleResponse
             * @constructor
             * @param {dam.v1.IGetViewRoleResponse=} [properties] Properties to set
             */
            function GetViewRoleResponse(properties) {
                this.access = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetViewRoleResponse role.
             * @member {dam.v1.IAccessRole|null|undefined} role
             * @memberof dam.v1.GetViewRoleResponse
             * @instance
             */
            GetViewRoleResponse.prototype.role = null;

            /**
             * GetViewRoleResponse access.
             * @member {Array.<string>} access
             * @memberof dam.v1.GetViewRoleResponse
             * @instance
             */
            GetViewRoleResponse.prototype.access = $util.emptyArray;

            /**
             * Creates a new GetViewRoleResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {dam.v1.IGetViewRoleResponse=} [properties] Properties to set
             * @returns {dam.v1.GetViewRoleResponse} GetViewRoleResponse instance
             */
            GetViewRoleResponse.create = function create(properties) {
                return new GetViewRoleResponse(properties);
            };

            /**
             * Encodes the specified GetViewRoleResponse message. Does not implicitly {@link dam.v1.GetViewRoleResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {dam.v1.IGetViewRoleResponse} message GetViewRoleResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRoleResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.role != null && message.hasOwnProperty("role"))
                    $root.dam.v1.AccessRole.encode(message.role, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.access != null && message.access.length)
                    for (var i = 0; i < message.access.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.access[i]);
                return writer;
            };

            /**
             * Encodes the specified GetViewRoleResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewRoleResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {dam.v1.IGetViewRoleResponse} message GetViewRoleResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetViewRoleResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetViewRoleResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetViewRoleResponse} GetViewRoleResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRoleResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetViewRoleResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.role = $root.dam.v1.AccessRole.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.access && message.access.length))
                            message.access = [];
                        message.access.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetViewRoleResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetViewRoleResponse} GetViewRoleResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetViewRoleResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetViewRoleResponse message.
             * @function verify
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetViewRoleResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.role != null && message.hasOwnProperty("role")) {
                    var error = $root.dam.v1.AccessRole.verify(message.role);
                    if (error)
                        return "role." + error;
                }
                if (message.access != null && message.hasOwnProperty("access")) {
                    if (!Array.isArray(message.access))
                        return "access: array expected";
                    for (var i = 0; i < message.access.length; ++i)
                        if (!$util.isString(message.access[i]))
                            return "access: string[] expected";
                }
                return null;
            };

            /**
             * Creates a GetViewRoleResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetViewRoleResponse} GetViewRoleResponse
             */
            GetViewRoleResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetViewRoleResponse)
                    return object;
                var message = new $root.dam.v1.GetViewRoleResponse();
                if (object.role != null) {
                    if (typeof object.role !== "object")
                        throw TypeError(".dam.v1.GetViewRoleResponse.role: object expected");
                    message.role = $root.dam.v1.AccessRole.fromObject(object.role);
                }
                if (object.access) {
                    if (!Array.isArray(object.access))
                        throw TypeError(".dam.v1.GetViewRoleResponse.access: array expected");
                    message.access = [];
                    for (var i = 0; i < object.access.length; ++i)
                        message.access[i] = String(object.access[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetViewRoleResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetViewRoleResponse
             * @static
             * @param {dam.v1.GetViewRoleResponse} message GetViewRoleResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetViewRoleResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.access = [];
                if (options.defaults)
                    object.role = null;
                if (message.role != null && message.hasOwnProperty("role"))
                    object.role = $root.dam.v1.AccessRole.toObject(message.role, options);
                if (message.access && message.access.length) {
                    object.access = [];
                    for (var j = 0; j < message.access.length; ++j)
                        object.access[j] = message.access[j];
                }
                return object;
            };

            /**
             * Converts this GetViewRoleResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetViewRoleResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetViewRoleResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetViewRoleResponse;
        })();

        v1.GetTokenRequest = (function() {

            /**
             * Properties of a GetTokenRequest.
             * @memberof dam.v1
             * @interface IGetTokenRequest
             * @property {string|null} ["return"] GetTokenRequest return
             * @property {string|null} [dataUse] GetTokenRequest dataUse
             * @property {number|null} [ttl] GetTokenRequest ttl
             */

            /**
             * Constructs a new GetTokenRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetTokenRequest.
             * @implements IGetTokenRequest
             * @constructor
             * @param {dam.v1.IGetTokenRequest=} [properties] Properties to set
             */
            function GetTokenRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTokenRequest return.
             * @member {string} return
             * @memberof dam.v1.GetTokenRequest
             * @instance
             */
            GetTokenRequest.prototype["return"] = "";

            /**
             * GetTokenRequest dataUse.
             * @member {string} dataUse
             * @memberof dam.v1.GetTokenRequest
             * @instance
             */
            GetTokenRequest.prototype.dataUse = "";

            /**
             * GetTokenRequest ttl.
             * @member {number} ttl
             * @memberof dam.v1.GetTokenRequest
             * @instance
             */
            GetTokenRequest.prototype.ttl = 0;

            /**
             * Creates a new GetTokenRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {dam.v1.IGetTokenRequest=} [properties] Properties to set
             * @returns {dam.v1.GetTokenRequest} GetTokenRequest instance
             */
            GetTokenRequest.create = function create(properties) {
                return new GetTokenRequest(properties);
            };

            /**
             * Encodes the specified GetTokenRequest message. Does not implicitly {@link dam.v1.GetTokenRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {dam.v1.IGetTokenRequest} message GetTokenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTokenRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message["return"] != null && message.hasOwnProperty("return"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message["return"]);
                if (message.dataUse != null && message.hasOwnProperty("dataUse"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.dataUse);
                if (message.ttl != null && message.hasOwnProperty("ttl"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.ttl);
                return writer;
            };

            /**
             * Encodes the specified GetTokenRequest message, length delimited. Does not implicitly {@link dam.v1.GetTokenRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {dam.v1.IGetTokenRequest} message GetTokenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTokenRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTokenRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetTokenRequest} GetTokenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTokenRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTokenRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message["return"] = reader.string();
                        break;
                    case 2:
                        message.dataUse = reader.string();
                        break;
                    case 3:
                        message.ttl = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTokenRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetTokenRequest} GetTokenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTokenRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTokenRequest message.
             * @function verify
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTokenRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message["return"] != null && message.hasOwnProperty("return"))
                    if (!$util.isString(message["return"]))
                        return "return: string expected";
                if (message.dataUse != null && message.hasOwnProperty("dataUse"))
                    if (!$util.isString(message.dataUse))
                        return "dataUse: string expected";
                if (message.ttl != null && message.hasOwnProperty("ttl"))
                    if (!$util.isInteger(message.ttl))
                        return "ttl: integer expected";
                return null;
            };

            /**
             * Creates a GetTokenRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetTokenRequest} GetTokenRequest
             */
            GetTokenRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetTokenRequest)
                    return object;
                var message = new $root.dam.v1.GetTokenRequest();
                if (object["return"] != null)
                    message["return"] = String(object["return"]);
                if (object.dataUse != null)
                    message.dataUse = String(object.dataUse);
                if (object.ttl != null)
                    message.ttl = object.ttl | 0;
                return message;
            };

            /**
             * Creates a plain object from a GetTokenRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetTokenRequest
             * @static
             * @param {dam.v1.GetTokenRequest} message GetTokenRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTokenRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object["return"] = "";
                    object.dataUse = "";
                    object.ttl = 0;
                }
                if (message["return"] != null && message.hasOwnProperty("return"))
                    object["return"] = message["return"];
                if (message.dataUse != null && message.hasOwnProperty("dataUse"))
                    object.dataUse = message.dataUse;
                if (message.ttl != null && message.hasOwnProperty("ttl"))
                    object.ttl = message.ttl;
                return object;
            };

            /**
             * Converts this GetTokenRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetTokenRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTokenRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTokenRequest;
        })();

        v1.GetTokenResponse = (function() {

            /**
             * Properties of a GetTokenResponse.
             * @memberof dam.v1
             * @interface IGetTokenResponse
             * @property {string|null} [name] GetTokenResponse name
             * @property {dam.v1.IView|null} [view] GetTokenResponse view
             * @property {string|null} [account] GetTokenResponse account
             * @property {string|null} [token] GetTokenResponse token
             * @property {string|null} [ttl] GetTokenResponse ttl
             */

            /**
             * Constructs a new GetTokenResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetTokenResponse.
             * @implements IGetTokenResponse
             * @constructor
             * @param {dam.v1.IGetTokenResponse=} [properties] Properties to set
             */
            function GetTokenResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTokenResponse name.
             * @member {string} name
             * @memberof dam.v1.GetTokenResponse
             * @instance
             */
            GetTokenResponse.prototype.name = "";

            /**
             * GetTokenResponse view.
             * @member {dam.v1.IView|null|undefined} view
             * @memberof dam.v1.GetTokenResponse
             * @instance
             */
            GetTokenResponse.prototype.view = null;

            /**
             * GetTokenResponse account.
             * @member {string} account
             * @memberof dam.v1.GetTokenResponse
             * @instance
             */
            GetTokenResponse.prototype.account = "";

            /**
             * GetTokenResponse token.
             * @member {string} token
             * @memberof dam.v1.GetTokenResponse
             * @instance
             */
            GetTokenResponse.prototype.token = "";

            /**
             * GetTokenResponse ttl.
             * @member {string} ttl
             * @memberof dam.v1.GetTokenResponse
             * @instance
             */
            GetTokenResponse.prototype.ttl = "";

            /**
             * Creates a new GetTokenResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {dam.v1.IGetTokenResponse=} [properties] Properties to set
             * @returns {dam.v1.GetTokenResponse} GetTokenResponse instance
             */
            GetTokenResponse.create = function create(properties) {
                return new GetTokenResponse(properties);
            };

            /**
             * Encodes the specified GetTokenResponse message. Does not implicitly {@link dam.v1.GetTokenResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {dam.v1.IGetTokenResponse} message GetTokenResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTokenResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.view != null && message.hasOwnProperty("view"))
                    $root.dam.v1.View.encode(message.view, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.account != null && message.hasOwnProperty("account"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.account);
                if (message.token != null && message.hasOwnProperty("token"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.token);
                if (message.ttl != null && message.hasOwnProperty("ttl"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.ttl);
                return writer;
            };

            /**
             * Encodes the specified GetTokenResponse message, length delimited. Does not implicitly {@link dam.v1.GetTokenResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {dam.v1.IGetTokenResponse} message GetTokenResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTokenResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTokenResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetTokenResponse} GetTokenResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTokenResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTokenResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.view = $root.dam.v1.View.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.account = reader.string();
                        break;
                    case 4:
                        message.token = reader.string();
                        break;
                    case 5:
                        message.ttl = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTokenResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetTokenResponse} GetTokenResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTokenResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTokenResponse message.
             * @function verify
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTokenResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.view != null && message.hasOwnProperty("view")) {
                    var error = $root.dam.v1.View.verify(message.view);
                    if (error)
                        return "view." + error;
                }
                if (message.account != null && message.hasOwnProperty("account"))
                    if (!$util.isString(message.account))
                        return "account: string expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                if (message.ttl != null && message.hasOwnProperty("ttl"))
                    if (!$util.isString(message.ttl))
                        return "ttl: string expected";
                return null;
            };

            /**
             * Creates a GetTokenResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetTokenResponse} GetTokenResponse
             */
            GetTokenResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetTokenResponse)
                    return object;
                var message = new $root.dam.v1.GetTokenResponse();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.view != null) {
                    if (typeof object.view !== "object")
                        throw TypeError(".dam.v1.GetTokenResponse.view: object expected");
                    message.view = $root.dam.v1.View.fromObject(object.view);
                }
                if (object.account != null)
                    message.account = String(object.account);
                if (object.token != null)
                    message.token = String(object.token);
                if (object.ttl != null)
                    message.ttl = String(object.ttl);
                return message;
            };

            /**
             * Creates a plain object from a GetTokenResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetTokenResponse
             * @static
             * @param {dam.v1.GetTokenResponse} message GetTokenResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTokenResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.view = null;
                    object.account = "";
                    object.token = "";
                    object.ttl = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.view != null && message.hasOwnProperty("view"))
                    object.view = $root.dam.v1.View.toObject(message.view, options);
                if (message.account != null && message.hasOwnProperty("account"))
                    object.account = message.account;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.ttl != null && message.hasOwnProperty("ttl"))
                    object.ttl = message.ttl;
                return object;
            };

            /**
             * Converts this GetTokenResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetTokenResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTokenResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTokenResponse;
        })();

        v1.GetTestResultsRequest = (function() {

            /**
             * Properties of a GetTestResultsRequest.
             * @memberof dam.v1
             * @interface IGetTestResultsRequest
             */

            /**
             * Constructs a new GetTestResultsRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetTestResultsRequest.
             * @implements IGetTestResultsRequest
             * @constructor
             * @param {dam.v1.IGetTestResultsRequest=} [properties] Properties to set
             */
            function GetTestResultsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetTestResultsRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {dam.v1.IGetTestResultsRequest=} [properties] Properties to set
             * @returns {dam.v1.GetTestResultsRequest} GetTestResultsRequest instance
             */
            GetTestResultsRequest.create = function create(properties) {
                return new GetTestResultsRequest(properties);
            };

            /**
             * Encodes the specified GetTestResultsRequest message. Does not implicitly {@link dam.v1.GetTestResultsRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {dam.v1.IGetTestResultsRequest} message GetTestResultsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestResultsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetTestResultsRequest message, length delimited. Does not implicitly {@link dam.v1.GetTestResultsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {dam.v1.IGetTestResultsRequest} message GetTestResultsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestResultsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTestResultsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetTestResultsRequest} GetTestResultsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestResultsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTestResultsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTestResultsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetTestResultsRequest} GetTestResultsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestResultsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTestResultsRequest message.
             * @function verify
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTestResultsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetTestResultsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetTestResultsRequest} GetTestResultsRequest
             */
            GetTestResultsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetTestResultsRequest)
                    return object;
                return new $root.dam.v1.GetTestResultsRequest();
            };

            /**
             * Creates a plain object from a GetTestResultsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetTestResultsRequest
             * @static
             * @param {dam.v1.GetTestResultsRequest} message GetTestResultsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTestResultsRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetTestResultsRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetTestResultsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTestResultsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTestResultsRequest;
        })();

        v1.GetTestResultsResponse = (function() {

            /**
             * Properties of a GetTestResultsResponse.
             * @memberof dam.v1
             * @interface IGetTestResultsResponse
             * @property {string|null} [version] GetTestResultsResponse version
             * @property {number|Long|null} [revision] GetTestResultsResponse revision
             * @property {number|null} [timestamp] GetTestResultsResponse timestamp
             * @property {Object.<string,dam.v1.ITestPersona>|null} [personas] GetTestResultsResponse personas
             * @property {Array.<dam.v1.GetTestResultsResponse.ITestResult>|null} [testResults] GetTestResultsResponse testResults
             * @property {dam.v1.IConfigModification|null} [modification] GetTestResultsResponse modification
             * @property {number|null} [executed] GetTestResultsResponse executed
             * @property {number|null} [passed] GetTestResultsResponse passed
             * @property {string|null} [error] GetTestResultsResponse error
             */

            /**
             * Constructs a new GetTestResultsResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetTestResultsResponse.
             * @implements IGetTestResultsResponse
             * @constructor
             * @param {dam.v1.IGetTestResultsResponse=} [properties] Properties to set
             */
            function GetTestResultsResponse(properties) {
                this.personas = {};
                this.testResults = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTestResultsResponse version.
             * @member {string} version
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.version = "";

            /**
             * GetTestResultsResponse revision.
             * @member {number|Long} revision
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * GetTestResultsResponse timestamp.
             * @member {number} timestamp
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.timestamp = 0;

            /**
             * GetTestResultsResponse personas.
             * @member {Object.<string,dam.v1.ITestPersona>} personas
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.personas = $util.emptyObject;

            /**
             * GetTestResultsResponse testResults.
             * @member {Array.<dam.v1.GetTestResultsResponse.ITestResult>} testResults
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.testResults = $util.emptyArray;

            /**
             * GetTestResultsResponse modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.modification = null;

            /**
             * GetTestResultsResponse executed.
             * @member {number} executed
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.executed = 0;

            /**
             * GetTestResultsResponse passed.
             * @member {number} passed
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.passed = 0;

            /**
             * GetTestResultsResponse error.
             * @member {string} error
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             */
            GetTestResultsResponse.prototype.error = "";

            /**
             * Creates a new GetTestResultsResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {dam.v1.IGetTestResultsResponse=} [properties] Properties to set
             * @returns {dam.v1.GetTestResultsResponse} GetTestResultsResponse instance
             */
            GetTestResultsResponse.create = function create(properties) {
                return new GetTestResultsResponse(properties);
            };

            /**
             * Encodes the specified GetTestResultsResponse message. Does not implicitly {@link dam.v1.GetTestResultsResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {dam.v1.IGetTestResultsResponse} message GetTestResultsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestResultsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                if (message.revision != null && message.hasOwnProperty("revision"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.timestamp);
                if (message.personas != null && message.hasOwnProperty("personas"))
                    for (var keys = Object.keys(message.personas), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.TestPersona.encode(message.personas[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.testResults != null && message.testResults.length)
                    for (var i = 0; i < message.testResults.length; ++i)
                        $root.dam.v1.GetTestResultsResponse.TestResult.encode(message.testResults[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.executed != null && message.hasOwnProperty("executed"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.executed);
                if (message.passed != null && message.hasOwnProperty("passed"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.passed);
                if (message.error != null && message.hasOwnProperty("error"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.error);
                return writer;
            };

            /**
             * Encodes the specified GetTestResultsResponse message, length delimited. Does not implicitly {@link dam.v1.GetTestResultsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {dam.v1.IGetTestResultsResponse} message GetTestResultsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestResultsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTestResultsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetTestResultsResponse} GetTestResultsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestResultsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTestResultsResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.string();
                        break;
                    case 2:
                        message.revision = reader.int64();
                        break;
                    case 3:
                        message.timestamp = reader.double();
                        break;
                    case 4:
                        reader.skip().pos++;
                        if (message.personas === $util.emptyObject)
                            message.personas = {};
                        key = reader.string();
                        reader.pos++;
                        message.personas[key] = $root.dam.v1.TestPersona.decode(reader, reader.uint32());
                        break;
                    case 5:
                        if (!(message.testResults && message.testResults.length))
                            message.testResults = [];
                        message.testResults.push($root.dam.v1.GetTestResultsResponse.TestResult.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.executed = reader.int32();
                        break;
                    case 8:
                        message.passed = reader.int32();
                        break;
                    case 9:
                        message.error = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTestResultsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetTestResultsResponse} GetTestResultsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestResultsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTestResultsResponse message.
             * @function verify
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTestResultsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                        return "revision: integer|Long expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp !== "number")
                        return "timestamp: number expected";
                if (message.personas != null && message.hasOwnProperty("personas")) {
                    if (!$util.isObject(message.personas))
                        return "personas: object expected";
                    var key = Object.keys(message.personas);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.TestPersona.verify(message.personas[key[i]]);
                        if (error)
                            return "personas." + error;
                    }
                }
                if (message.testResults != null && message.hasOwnProperty("testResults")) {
                    if (!Array.isArray(message.testResults))
                        return "testResults: array expected";
                    for (var i = 0; i < message.testResults.length; ++i) {
                        var error = $root.dam.v1.GetTestResultsResponse.TestResult.verify(message.testResults[i]);
                        if (error)
                            return "testResults." + error;
                    }
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                if (message.executed != null && message.hasOwnProperty("executed"))
                    if (!$util.isInteger(message.executed))
                        return "executed: integer expected";
                if (message.passed != null && message.hasOwnProperty("passed"))
                    if (!$util.isInteger(message.passed))
                        return "passed: integer expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
                return null;
            };

            /**
             * Creates a GetTestResultsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetTestResultsResponse} GetTestResultsResponse
             */
            GetTestResultsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetTestResultsResponse)
                    return object;
                var message = new $root.dam.v1.GetTestResultsResponse();
                if (object.version != null)
                    message.version = String(object.version);
                if (object.revision != null)
                    if ($util.Long)
                        (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                    else if (typeof object.revision === "string")
                        message.revision = parseInt(object.revision, 10);
                    else if (typeof object.revision === "number")
                        message.revision = object.revision;
                    else if (typeof object.revision === "object")
                        message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
                if (object.timestamp != null)
                    message.timestamp = Number(object.timestamp);
                if (object.personas) {
                    if (typeof object.personas !== "object")
                        throw TypeError(".dam.v1.GetTestResultsResponse.personas: object expected");
                    message.personas = {};
                    for (var keys = Object.keys(object.personas), i = 0; i < keys.length; ++i) {
                        if (typeof object.personas[keys[i]] !== "object")
                            throw TypeError(".dam.v1.GetTestResultsResponse.personas: object expected");
                        message.personas[keys[i]] = $root.dam.v1.TestPersona.fromObject(object.personas[keys[i]]);
                    }
                }
                if (object.testResults) {
                    if (!Array.isArray(object.testResults))
                        throw TypeError(".dam.v1.GetTestResultsResponse.testResults: array expected");
                    message.testResults = [];
                    for (var i = 0; i < object.testResults.length; ++i) {
                        if (typeof object.testResults[i] !== "object")
                            throw TypeError(".dam.v1.GetTestResultsResponse.testResults: object expected");
                        message.testResults[i] = $root.dam.v1.GetTestResultsResponse.TestResult.fromObject(object.testResults[i]);
                    }
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.GetTestResultsResponse.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                if (object.executed != null)
                    message.executed = object.executed | 0;
                if (object.passed != null)
                    message.passed = object.passed | 0;
                if (object.error != null)
                    message.error = String(object.error);
                return message;
            };

            /**
             * Creates a plain object from a GetTestResultsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetTestResultsResponse
             * @static
             * @param {dam.v1.GetTestResultsResponse} message GetTestResultsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTestResultsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.testResults = [];
                if (options.objects || options.defaults)
                    object.personas = {};
                if (options.defaults) {
                    object.version = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.revision = options.longs === String ? "0" : 0;
                    object.timestamp = 0;
                    object.modification = null;
                    object.executed = 0;
                    object.passed = 0;
                    object.error = "";
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (typeof message.revision === "number")
                        object.revision = options.longs === String ? String(message.revision) : message.revision;
                    else
                        object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = options.json && !isFinite(message.timestamp) ? String(message.timestamp) : message.timestamp;
                var keys2;
                if (message.personas && (keys2 = Object.keys(message.personas)).length) {
                    object.personas = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.personas[keys2[j]] = $root.dam.v1.TestPersona.toObject(message.personas[keys2[j]], options);
                }
                if (message.testResults && message.testResults.length) {
                    object.testResults = [];
                    for (var j = 0; j < message.testResults.length; ++j)
                        object.testResults[j] = $root.dam.v1.GetTestResultsResponse.TestResult.toObject(message.testResults[j], options);
                }
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                if (message.executed != null && message.hasOwnProperty("executed"))
                    object.executed = message.executed;
                if (message.passed != null && message.hasOwnProperty("passed"))
                    object.passed = message.passed;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                return object;
            };

            /**
             * Converts this GetTestResultsResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetTestResultsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTestResultsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            GetTestResultsResponse.TestResult = (function() {

                /**
                 * Properties of a TestResult.
                 * @memberof dam.v1.GetTestResultsResponse
                 * @interface ITestResult
                 * @property {string|null} [name] TestResult name
                 * @property {string|null} [result] TestResult result
                 * @property {Object.<string,dam.v1.IAccessList>|null} [resources] TestResult resources
                 * @property {string|null} [error] TestResult error
                 */

                /**
                 * Constructs a new TestResult.
                 * @memberof dam.v1.GetTestResultsResponse
                 * @classdesc Represents a TestResult.
                 * @implements ITestResult
                 * @constructor
                 * @param {dam.v1.GetTestResultsResponse.ITestResult=} [properties] Properties to set
                 */
                function TestResult(properties) {
                    this.resources = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestResult name.
                 * @member {string} name
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @instance
                 */
                TestResult.prototype.name = "";

                /**
                 * TestResult result.
                 * @member {string} result
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @instance
                 */
                TestResult.prototype.result = "";

                /**
                 * TestResult resources.
                 * @member {Object.<string,dam.v1.IAccessList>} resources
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @instance
                 */
                TestResult.prototype.resources = $util.emptyObject;

                /**
                 * TestResult error.
                 * @member {string} error
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @instance
                 */
                TestResult.prototype.error = "";

                /**
                 * Creates a new TestResult instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {dam.v1.GetTestResultsResponse.ITestResult=} [properties] Properties to set
                 * @returns {dam.v1.GetTestResultsResponse.TestResult} TestResult instance
                 */
                TestResult.create = function create(properties) {
                    return new TestResult(properties);
                };

                /**
                 * Encodes the specified TestResult message. Does not implicitly {@link dam.v1.GetTestResultsResponse.TestResult.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {dam.v1.GetTestResultsResponse.ITestResult} message TestResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestResult.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.result != null && message.hasOwnProperty("result"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.result);
                    if (message.resources != null && message.hasOwnProperty("resources"))
                        for (var keys = Object.keys(message.resources), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.dam.v1.AccessList.encode(message.resources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    if (message.error != null && message.hasOwnProperty("error"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.error);
                    return writer;
                };

                /**
                 * Encodes the specified TestResult message, length delimited. Does not implicitly {@link dam.v1.GetTestResultsResponse.TestResult.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {dam.v1.GetTestResultsResponse.ITestResult} message TestResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestResult.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestResult message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.GetTestResultsResponse.TestResult} TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestResult.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTestResultsResponse.TestResult(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.result = reader.string();
                            break;
                        case 3:
                            reader.skip().pos++;
                            if (message.resources === $util.emptyObject)
                                message.resources = {};
                            key = reader.string();
                            reader.pos++;
                            message.resources[key] = $root.dam.v1.AccessList.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.error = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestResult message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.GetTestResultsResponse.TestResult} TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestResult.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestResult message.
                 * @function verify
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestResult.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.result != null && message.hasOwnProperty("result"))
                        if (!$util.isString(message.result))
                            return "result: string expected";
                    if (message.resources != null && message.hasOwnProperty("resources")) {
                        if (!$util.isObject(message.resources))
                            return "resources: object expected";
                        var key = Object.keys(message.resources);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.dam.v1.AccessList.verify(message.resources[key[i]]);
                            if (error)
                                return "resources." + error;
                        }
                    }
                    if (message.error != null && message.hasOwnProperty("error"))
                        if (!$util.isString(message.error))
                            return "error: string expected";
                    return null;
                };

                /**
                 * Creates a TestResult message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.GetTestResultsResponse.TestResult} TestResult
                 */
                TestResult.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.GetTestResultsResponse.TestResult)
                        return object;
                    var message = new $root.dam.v1.GetTestResultsResponse.TestResult();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.result != null)
                        message.result = String(object.result);
                    if (object.resources) {
                        if (typeof object.resources !== "object")
                            throw TypeError(".dam.v1.GetTestResultsResponse.TestResult.resources: object expected");
                        message.resources = {};
                        for (var keys = Object.keys(object.resources), i = 0; i < keys.length; ++i) {
                            if (typeof object.resources[keys[i]] !== "object")
                                throw TypeError(".dam.v1.GetTestResultsResponse.TestResult.resources: object expected");
                            message.resources[keys[i]] = $root.dam.v1.AccessList.fromObject(object.resources[keys[i]]);
                        }
                    }
                    if (object.error != null)
                        message.error = String(object.error);
                    return message;
                };

                /**
                 * Creates a plain object from a TestResult message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @static
                 * @param {dam.v1.GetTestResultsResponse.TestResult} message TestResult
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestResult.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults)
                        object.resources = {};
                    if (options.defaults) {
                        object.name = "";
                        object.result = "";
                        object.error = "";
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.result != null && message.hasOwnProperty("result"))
                        object.result = message.result;
                    var keys2;
                    if (message.resources && (keys2 = Object.keys(message.resources)).length) {
                        object.resources = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.resources[keys2[j]] = $root.dam.v1.AccessList.toObject(message.resources[keys2[j]], options);
                    }
                    if (message.error != null && message.hasOwnProperty("error"))
                        object.error = message.error;
                    return object;
                };

                /**
                 * Converts this TestResult to JSON.
                 * @function toJSON
                 * @memberof dam.v1.GetTestResultsResponse.TestResult
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestResult.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestResult;
            })();

            return GetTestResultsResponse;
        })();

        v1.ClientSecretRequest = (function() {

            /**
             * Properties of a ClientSecretRequest.
             * @memberof dam.v1
             * @interface IClientSecretRequest
             */

            /**
             * Constructs a new ClientSecretRequest.
             * @memberof dam.v1
             * @classdesc Represents a ClientSecretRequest.
             * @implements IClientSecretRequest
             * @constructor
             * @param {dam.v1.IClientSecretRequest=} [properties] Properties to set
             */
            function ClientSecretRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new ClientSecretRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {dam.v1.IClientSecretRequest=} [properties] Properties to set
             * @returns {dam.v1.ClientSecretRequest} ClientSecretRequest instance
             */
            ClientSecretRequest.create = function create(properties) {
                return new ClientSecretRequest(properties);
            };

            /**
             * Encodes the specified ClientSecretRequest message. Does not implicitly {@link dam.v1.ClientSecretRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {dam.v1.IClientSecretRequest} message ClientSecretRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientSecretRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified ClientSecretRequest message, length delimited. Does not implicitly {@link dam.v1.ClientSecretRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {dam.v1.IClientSecretRequest} message ClientSecretRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientSecretRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClientSecretRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ClientSecretRequest} ClientSecretRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientSecretRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ClientSecretRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ClientSecretRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ClientSecretRequest} ClientSecretRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientSecretRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClientSecretRequest message.
             * @function verify
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientSecretRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a ClientSecretRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ClientSecretRequest} ClientSecretRequest
             */
            ClientSecretRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ClientSecretRequest)
                    return object;
                return new $root.dam.v1.ClientSecretRequest();
            };

            /**
             * Creates a plain object from a ClientSecretRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ClientSecretRequest
             * @static
             * @param {dam.v1.ClientSecretRequest} message ClientSecretRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientSecretRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClientSecretRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ClientSecretRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientSecretRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClientSecretRequest;
        })();

        v1.ClientSecretResponse = (function() {

            /**
             * Properties of a ClientSecretResponse.
             * @memberof dam.v1
             * @interface IClientSecretResponse
             * @property {string|null} [secret] ClientSecretResponse secret
             */

            /**
             * Constructs a new ClientSecretResponse.
             * @memberof dam.v1
             * @classdesc Represents a ClientSecretResponse.
             * @implements IClientSecretResponse
             * @constructor
             * @param {dam.v1.IClientSecretResponse=} [properties] Properties to set
             */
            function ClientSecretResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClientSecretResponse secret.
             * @member {string} secret
             * @memberof dam.v1.ClientSecretResponse
             * @instance
             */
            ClientSecretResponse.prototype.secret = "";

            /**
             * Creates a new ClientSecretResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {dam.v1.IClientSecretResponse=} [properties] Properties to set
             * @returns {dam.v1.ClientSecretResponse} ClientSecretResponse instance
             */
            ClientSecretResponse.create = function create(properties) {
                return new ClientSecretResponse(properties);
            };

            /**
             * Encodes the specified ClientSecretResponse message. Does not implicitly {@link dam.v1.ClientSecretResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {dam.v1.IClientSecretResponse} message ClientSecretResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientSecretResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.secret != null && message.hasOwnProperty("secret"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.secret);
                return writer;
            };

            /**
             * Encodes the specified ClientSecretResponse message, length delimited. Does not implicitly {@link dam.v1.ClientSecretResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {dam.v1.IClientSecretResponse} message ClientSecretResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientSecretResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClientSecretResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ClientSecretResponse} ClientSecretResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientSecretResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ClientSecretResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.secret = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ClientSecretResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ClientSecretResponse} ClientSecretResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientSecretResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClientSecretResponse message.
             * @function verify
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientSecretResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.secret != null && message.hasOwnProperty("secret"))
                    if (!$util.isString(message.secret))
                        return "secret: string expected";
                return null;
            };

            /**
             * Creates a ClientSecretResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ClientSecretResponse} ClientSecretResponse
             */
            ClientSecretResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ClientSecretResponse)
                    return object;
                var message = new $root.dam.v1.ClientSecretResponse();
                if (object.secret != null)
                    message.secret = String(object.secret);
                return message;
            };

            /**
             * Creates a plain object from a ClientSecretResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ClientSecretResponse
             * @static
             * @param {dam.v1.ClientSecretResponse} message ClientSecretResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientSecretResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.secret = "";
                if (message.secret != null && message.hasOwnProperty("secret"))
                    object.secret = message.secret;
                return object;
            };

            /**
             * Converts this ClientSecretResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.ClientSecretResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientSecretResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClientSecretResponse;
        })();

        v1.TargetAdaptersRequest = (function() {

            /**
             * Properties of a TargetAdaptersRequest.
             * @memberof dam.v1
             * @interface ITargetAdaptersRequest
             */

            /**
             * Constructs a new TargetAdaptersRequest.
             * @memberof dam.v1
             * @classdesc Represents a TargetAdaptersRequest.
             * @implements ITargetAdaptersRequest
             * @constructor
             * @param {dam.v1.ITargetAdaptersRequest=} [properties] Properties to set
             */
            function TargetAdaptersRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new TargetAdaptersRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {dam.v1.ITargetAdaptersRequest=} [properties] Properties to set
             * @returns {dam.v1.TargetAdaptersRequest} TargetAdaptersRequest instance
             */
            TargetAdaptersRequest.create = function create(properties) {
                return new TargetAdaptersRequest(properties);
            };

            /**
             * Encodes the specified TargetAdaptersRequest message. Does not implicitly {@link dam.v1.TargetAdaptersRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {dam.v1.ITargetAdaptersRequest} message TargetAdaptersRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TargetAdaptersRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified TargetAdaptersRequest message, length delimited. Does not implicitly {@link dam.v1.TargetAdaptersRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {dam.v1.ITargetAdaptersRequest} message TargetAdaptersRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TargetAdaptersRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TargetAdaptersRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.TargetAdaptersRequest} TargetAdaptersRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TargetAdaptersRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TargetAdaptersRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TargetAdaptersRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.TargetAdaptersRequest} TargetAdaptersRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TargetAdaptersRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TargetAdaptersRequest message.
             * @function verify
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TargetAdaptersRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a TargetAdaptersRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.TargetAdaptersRequest} TargetAdaptersRequest
             */
            TargetAdaptersRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.TargetAdaptersRequest)
                    return object;
                return new $root.dam.v1.TargetAdaptersRequest();
            };

            /**
             * Creates a plain object from a TargetAdaptersRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.TargetAdaptersRequest
             * @static
             * @param {dam.v1.TargetAdaptersRequest} message TargetAdaptersRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TargetAdaptersRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this TargetAdaptersRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.TargetAdaptersRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TargetAdaptersRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TargetAdaptersRequest;
        })();

        v1.TargetAdaptersResponse = (function() {

            /**
             * Properties of a TargetAdaptersResponse.
             * @memberof dam.v1
             * @interface ITargetAdaptersResponse
             * @property {Object.<string,dam.v1.ITargetAdapter>|null} [targetAdapters] TargetAdaptersResponse targetAdapters
             */

            /**
             * Constructs a new TargetAdaptersResponse.
             * @memberof dam.v1
             * @classdesc Represents a TargetAdaptersResponse.
             * @implements ITargetAdaptersResponse
             * @constructor
             * @param {dam.v1.ITargetAdaptersResponse=} [properties] Properties to set
             */
            function TargetAdaptersResponse(properties) {
                this.targetAdapters = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TargetAdaptersResponse targetAdapters.
             * @member {Object.<string,dam.v1.ITargetAdapter>} targetAdapters
             * @memberof dam.v1.TargetAdaptersResponse
             * @instance
             */
            TargetAdaptersResponse.prototype.targetAdapters = $util.emptyObject;

            /**
             * Creates a new TargetAdaptersResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {dam.v1.ITargetAdaptersResponse=} [properties] Properties to set
             * @returns {dam.v1.TargetAdaptersResponse} TargetAdaptersResponse instance
             */
            TargetAdaptersResponse.create = function create(properties) {
                return new TargetAdaptersResponse(properties);
            };

            /**
             * Encodes the specified TargetAdaptersResponse message. Does not implicitly {@link dam.v1.TargetAdaptersResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {dam.v1.ITargetAdaptersResponse} message TargetAdaptersResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TargetAdaptersResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.targetAdapters != null && message.hasOwnProperty("targetAdapters"))
                    for (var keys = Object.keys(message.targetAdapters), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.TargetAdapter.encode(message.targetAdapters[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified TargetAdaptersResponse message, length delimited. Does not implicitly {@link dam.v1.TargetAdaptersResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {dam.v1.ITargetAdaptersResponse} message TargetAdaptersResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TargetAdaptersResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TargetAdaptersResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.TargetAdaptersResponse} TargetAdaptersResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TargetAdaptersResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.TargetAdaptersResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.targetAdapters === $util.emptyObject)
                            message.targetAdapters = {};
                        key = reader.string();
                        reader.pos++;
                        message.targetAdapters[key] = $root.dam.v1.TargetAdapter.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TargetAdaptersResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.TargetAdaptersResponse} TargetAdaptersResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TargetAdaptersResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TargetAdaptersResponse message.
             * @function verify
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TargetAdaptersResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.targetAdapters != null && message.hasOwnProperty("targetAdapters")) {
                    if (!$util.isObject(message.targetAdapters))
                        return "targetAdapters: object expected";
                    var key = Object.keys(message.targetAdapters);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.TargetAdapter.verify(message.targetAdapters[key[i]]);
                        if (error)
                            return "targetAdapters." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TargetAdaptersResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.TargetAdaptersResponse} TargetAdaptersResponse
             */
            TargetAdaptersResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.TargetAdaptersResponse)
                    return object;
                var message = new $root.dam.v1.TargetAdaptersResponse();
                if (object.targetAdapters) {
                    if (typeof object.targetAdapters !== "object")
                        throw TypeError(".dam.v1.TargetAdaptersResponse.targetAdapters: object expected");
                    message.targetAdapters = {};
                    for (var keys = Object.keys(object.targetAdapters), i = 0; i < keys.length; ++i) {
                        if (typeof object.targetAdapters[keys[i]] !== "object")
                            throw TypeError(".dam.v1.TargetAdaptersResponse.targetAdapters: object expected");
                        message.targetAdapters[keys[i]] = $root.dam.v1.TargetAdapter.fromObject(object.targetAdapters[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TargetAdaptersResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.TargetAdaptersResponse
             * @static
             * @param {dam.v1.TargetAdaptersResponse} message TargetAdaptersResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TargetAdaptersResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.targetAdapters = {};
                var keys2;
                if (message.targetAdapters && (keys2 = Object.keys(message.targetAdapters)).length) {
                    object.targetAdapters = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.targetAdapters[keys2[j]] = $root.dam.v1.TargetAdapter.toObject(message.targetAdapters[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this TargetAdaptersResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.TargetAdaptersResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TargetAdaptersResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TargetAdaptersResponse;
        })();

        v1.PassportTranslatorsRequest = (function() {

            /**
             * Properties of a PassportTranslatorsRequest.
             * @memberof dam.v1
             * @interface IPassportTranslatorsRequest
             */

            /**
             * Constructs a new PassportTranslatorsRequest.
             * @memberof dam.v1
             * @classdesc Represents a PassportTranslatorsRequest.
             * @implements IPassportTranslatorsRequest
             * @constructor
             * @param {dam.v1.IPassportTranslatorsRequest=} [properties] Properties to set
             */
            function PassportTranslatorsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new PassportTranslatorsRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {dam.v1.IPassportTranslatorsRequest=} [properties] Properties to set
             * @returns {dam.v1.PassportTranslatorsRequest} PassportTranslatorsRequest instance
             */
            PassportTranslatorsRequest.create = function create(properties) {
                return new PassportTranslatorsRequest(properties);
            };

            /**
             * Encodes the specified PassportTranslatorsRequest message. Does not implicitly {@link dam.v1.PassportTranslatorsRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {dam.v1.IPassportTranslatorsRequest} message PassportTranslatorsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PassportTranslatorsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified PassportTranslatorsRequest message, length delimited. Does not implicitly {@link dam.v1.PassportTranslatorsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {dam.v1.IPassportTranslatorsRequest} message PassportTranslatorsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PassportTranslatorsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PassportTranslatorsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.PassportTranslatorsRequest} PassportTranslatorsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PassportTranslatorsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.PassportTranslatorsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PassportTranslatorsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.PassportTranslatorsRequest} PassportTranslatorsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PassportTranslatorsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PassportTranslatorsRequest message.
             * @function verify
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PassportTranslatorsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a PassportTranslatorsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.PassportTranslatorsRequest} PassportTranslatorsRequest
             */
            PassportTranslatorsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.PassportTranslatorsRequest)
                    return object;
                return new $root.dam.v1.PassportTranslatorsRequest();
            };

            /**
             * Creates a plain object from a PassportTranslatorsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.PassportTranslatorsRequest
             * @static
             * @param {dam.v1.PassportTranslatorsRequest} message PassportTranslatorsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PassportTranslatorsRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this PassportTranslatorsRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.PassportTranslatorsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PassportTranslatorsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PassportTranslatorsRequest;
        })();

        v1.PassportTranslatorsResponse = (function() {

            /**
             * Properties of a PassportTranslatorsResponse.
             * @memberof dam.v1
             * @interface IPassportTranslatorsResponse
             * @property {Object.<string,dam.v1.IPassportTranslator>|null} [passportTranslators] PassportTranslatorsResponse passportTranslators
             */

            /**
             * Constructs a new PassportTranslatorsResponse.
             * @memberof dam.v1
             * @classdesc Represents a PassportTranslatorsResponse.
             * @implements IPassportTranslatorsResponse
             * @constructor
             * @param {dam.v1.IPassportTranslatorsResponse=} [properties] Properties to set
             */
            function PassportTranslatorsResponse(properties) {
                this.passportTranslators = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PassportTranslatorsResponse passportTranslators.
             * @member {Object.<string,dam.v1.IPassportTranslator>} passportTranslators
             * @memberof dam.v1.PassportTranslatorsResponse
             * @instance
             */
            PassportTranslatorsResponse.prototype.passportTranslators = $util.emptyObject;

            /**
             * Creates a new PassportTranslatorsResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {dam.v1.IPassportTranslatorsResponse=} [properties] Properties to set
             * @returns {dam.v1.PassportTranslatorsResponse} PassportTranslatorsResponse instance
             */
            PassportTranslatorsResponse.create = function create(properties) {
                return new PassportTranslatorsResponse(properties);
            };

            /**
             * Encodes the specified PassportTranslatorsResponse message. Does not implicitly {@link dam.v1.PassportTranslatorsResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {dam.v1.IPassportTranslatorsResponse} message PassportTranslatorsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PassportTranslatorsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.passportTranslators != null && message.hasOwnProperty("passportTranslators"))
                    for (var keys = Object.keys(message.passportTranslators), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.PassportTranslator.encode(message.passportTranslators[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified PassportTranslatorsResponse message, length delimited. Does not implicitly {@link dam.v1.PassportTranslatorsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {dam.v1.IPassportTranslatorsResponse} message PassportTranslatorsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PassportTranslatorsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PassportTranslatorsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.PassportTranslatorsResponse} PassportTranslatorsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PassportTranslatorsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.PassportTranslatorsResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.passportTranslators === $util.emptyObject)
                            message.passportTranslators = {};
                        key = reader.string();
                        reader.pos++;
                        message.passportTranslators[key] = $root.dam.v1.PassportTranslator.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PassportTranslatorsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.PassportTranslatorsResponse} PassportTranslatorsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PassportTranslatorsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PassportTranslatorsResponse message.
             * @function verify
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PassportTranslatorsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.passportTranslators != null && message.hasOwnProperty("passportTranslators")) {
                    if (!$util.isObject(message.passportTranslators))
                        return "passportTranslators: object expected";
                    var key = Object.keys(message.passportTranslators);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.PassportTranslator.verify(message.passportTranslators[key[i]]);
                        if (error)
                            return "passportTranslators." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a PassportTranslatorsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.PassportTranslatorsResponse} PassportTranslatorsResponse
             */
            PassportTranslatorsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.PassportTranslatorsResponse)
                    return object;
                var message = new $root.dam.v1.PassportTranslatorsResponse();
                if (object.passportTranslators) {
                    if (typeof object.passportTranslators !== "object")
                        throw TypeError(".dam.v1.PassportTranslatorsResponse.passportTranslators: object expected");
                    message.passportTranslators = {};
                    for (var keys = Object.keys(object.passportTranslators), i = 0; i < keys.length; ++i) {
                        if (typeof object.passportTranslators[keys[i]] !== "object")
                            throw TypeError(".dam.v1.PassportTranslatorsResponse.passportTranslators: object expected");
                        message.passportTranslators[keys[i]] = $root.dam.v1.PassportTranslator.fromObject(object.passportTranslators[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a PassportTranslatorsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.PassportTranslatorsResponse
             * @static
             * @param {dam.v1.PassportTranslatorsResponse} message PassportTranslatorsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PassportTranslatorsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.passportTranslators = {};
                var keys2;
                if (message.passportTranslators && (keys2 = Object.keys(message.passportTranslators)).length) {
                    object.passportTranslators = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.passportTranslators[keys2[j]] = $root.dam.v1.PassportTranslator.toObject(message.passportTranslators[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this PassportTranslatorsResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.PassportTranslatorsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PassportTranslatorsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PassportTranslatorsResponse;
        })();

        v1.DamRoleCategoriesRequest = (function() {

            /**
             * Properties of a DamRoleCategoriesRequest.
             * @memberof dam.v1
             * @interface IDamRoleCategoriesRequest
             */

            /**
             * Constructs a new DamRoleCategoriesRequest.
             * @memberof dam.v1
             * @classdesc Represents a DamRoleCategoriesRequest.
             * @implements IDamRoleCategoriesRequest
             * @constructor
             * @param {dam.v1.IDamRoleCategoriesRequest=} [properties] Properties to set
             */
            function DamRoleCategoriesRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new DamRoleCategoriesRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {dam.v1.IDamRoleCategoriesRequest=} [properties] Properties to set
             * @returns {dam.v1.DamRoleCategoriesRequest} DamRoleCategoriesRequest instance
             */
            DamRoleCategoriesRequest.create = function create(properties) {
                return new DamRoleCategoriesRequest(properties);
            };

            /**
             * Encodes the specified DamRoleCategoriesRequest message. Does not implicitly {@link dam.v1.DamRoleCategoriesRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {dam.v1.IDamRoleCategoriesRequest} message DamRoleCategoriesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamRoleCategoriesRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified DamRoleCategoriesRequest message, length delimited. Does not implicitly {@link dam.v1.DamRoleCategoriesRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {dam.v1.IDamRoleCategoriesRequest} message DamRoleCategoriesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamRoleCategoriesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DamRoleCategoriesRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.DamRoleCategoriesRequest} DamRoleCategoriesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamRoleCategoriesRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.DamRoleCategoriesRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DamRoleCategoriesRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.DamRoleCategoriesRequest} DamRoleCategoriesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamRoleCategoriesRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DamRoleCategoriesRequest message.
             * @function verify
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DamRoleCategoriesRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a DamRoleCategoriesRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.DamRoleCategoriesRequest} DamRoleCategoriesRequest
             */
            DamRoleCategoriesRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.DamRoleCategoriesRequest)
                    return object;
                return new $root.dam.v1.DamRoleCategoriesRequest();
            };

            /**
             * Creates a plain object from a DamRoleCategoriesRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @static
             * @param {dam.v1.DamRoleCategoriesRequest} message DamRoleCategoriesRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DamRoleCategoriesRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this DamRoleCategoriesRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.DamRoleCategoriesRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DamRoleCategoriesRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DamRoleCategoriesRequest;
        })();

        v1.RoleCategory = (function() {

            /**
             * Properties of a RoleCategory.
             * @memberof dam.v1
             * @interface IRoleCategory
             * @property {number|null} [order] RoleCategory order
             * @property {Object.<string,string>|null} [ui] RoleCategory ui
             */

            /**
             * Constructs a new RoleCategory.
             * @memberof dam.v1
             * @classdesc Represents a RoleCategory.
             * @implements IRoleCategory
             * @constructor
             * @param {dam.v1.IRoleCategory=} [properties] Properties to set
             */
            function RoleCategory(properties) {
                this.ui = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RoleCategory order.
             * @member {number} order
             * @memberof dam.v1.RoleCategory
             * @instance
             */
            RoleCategory.prototype.order = 0;

            /**
             * RoleCategory ui.
             * @member {Object.<string,string>} ui
             * @memberof dam.v1.RoleCategory
             * @instance
             */
            RoleCategory.prototype.ui = $util.emptyObject;

            /**
             * Creates a new RoleCategory instance using the specified properties.
             * @function create
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {dam.v1.IRoleCategory=} [properties] Properties to set
             * @returns {dam.v1.RoleCategory} RoleCategory instance
             */
            RoleCategory.create = function create(properties) {
                return new RoleCategory(properties);
            };

            /**
             * Encodes the specified RoleCategory message. Does not implicitly {@link dam.v1.RoleCategory.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {dam.v1.IRoleCategory} message RoleCategory message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoleCategory.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.order != null && message.hasOwnProperty("order"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.order);
                if (message.ui != null && message.hasOwnProperty("ui"))
                    for (var keys = Object.keys(message.ui), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ui[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RoleCategory message, length delimited. Does not implicitly {@link dam.v1.RoleCategory.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {dam.v1.IRoleCategory} message RoleCategory message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoleCategory.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RoleCategory message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.RoleCategory} RoleCategory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoleCategory.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.RoleCategory(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.order = reader.int32();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.ui === $util.emptyObject)
                            message.ui = {};
                        key = reader.string();
                        reader.pos++;
                        message.ui[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RoleCategory message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.RoleCategory} RoleCategory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoleCategory.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RoleCategory message.
             * @function verify
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RoleCategory.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.order != null && message.hasOwnProperty("order"))
                    if (!$util.isInteger(message.order))
                        return "order: integer expected";
                if (message.ui != null && message.hasOwnProperty("ui")) {
                    if (!$util.isObject(message.ui))
                        return "ui: object expected";
                    var key = Object.keys(message.ui);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.ui[key[i]]))
                            return "ui: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a RoleCategory message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.RoleCategory} RoleCategory
             */
            RoleCategory.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.RoleCategory)
                    return object;
                var message = new $root.dam.v1.RoleCategory();
                if (object.order != null)
                    message.order = object.order | 0;
                if (object.ui) {
                    if (typeof object.ui !== "object")
                        throw TypeError(".dam.v1.RoleCategory.ui: object expected");
                    message.ui = {};
                    for (var keys = Object.keys(object.ui), i = 0; i < keys.length; ++i)
                        message.ui[keys[i]] = String(object.ui[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a RoleCategory message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.RoleCategory
             * @static
             * @param {dam.v1.RoleCategory} message RoleCategory
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RoleCategory.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ui = {};
                if (options.defaults)
                    object.order = 0;
                if (message.order != null && message.hasOwnProperty("order"))
                    object.order = message.order;
                var keys2;
                if (message.ui && (keys2 = Object.keys(message.ui)).length) {
                    object.ui = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ui[keys2[j]] = message.ui[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this RoleCategory to JSON.
             * @function toJSON
             * @memberof dam.v1.RoleCategory
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RoleCategory.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RoleCategory;
        })();

        v1.DamRoleCategoriesResponse = (function() {

            /**
             * Properties of a DamRoleCategoriesResponse.
             * @memberof dam.v1
             * @interface IDamRoleCategoriesResponse
             * @property {Object.<string,dam.v1.IRoleCategory>|null} [damRoleCategories] DamRoleCategoriesResponse damRoleCategories
             */

            /**
             * Constructs a new DamRoleCategoriesResponse.
             * @memberof dam.v1
             * @classdesc Represents a DamRoleCategoriesResponse.
             * @implements IDamRoleCategoriesResponse
             * @constructor
             * @param {dam.v1.IDamRoleCategoriesResponse=} [properties] Properties to set
             */
            function DamRoleCategoriesResponse(properties) {
                this.damRoleCategories = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DamRoleCategoriesResponse damRoleCategories.
             * @member {Object.<string,dam.v1.IRoleCategory>} damRoleCategories
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @instance
             */
            DamRoleCategoriesResponse.prototype.damRoleCategories = $util.emptyObject;

            /**
             * Creates a new DamRoleCategoriesResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {dam.v1.IDamRoleCategoriesResponse=} [properties] Properties to set
             * @returns {dam.v1.DamRoleCategoriesResponse} DamRoleCategoriesResponse instance
             */
            DamRoleCategoriesResponse.create = function create(properties) {
                return new DamRoleCategoriesResponse(properties);
            };

            /**
             * Encodes the specified DamRoleCategoriesResponse message. Does not implicitly {@link dam.v1.DamRoleCategoriesResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {dam.v1.IDamRoleCategoriesResponse} message DamRoleCategoriesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamRoleCategoriesResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.damRoleCategories != null && message.hasOwnProperty("damRoleCategories"))
                    for (var keys = Object.keys(message.damRoleCategories), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.RoleCategory.encode(message.damRoleCategories[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified DamRoleCategoriesResponse message, length delimited. Does not implicitly {@link dam.v1.DamRoleCategoriesResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {dam.v1.IDamRoleCategoriesResponse} message DamRoleCategoriesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamRoleCategoriesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DamRoleCategoriesResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.DamRoleCategoriesResponse} DamRoleCategoriesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamRoleCategoriesResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.DamRoleCategoriesResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.damRoleCategories === $util.emptyObject)
                            message.damRoleCategories = {};
                        key = reader.string();
                        reader.pos++;
                        message.damRoleCategories[key] = $root.dam.v1.RoleCategory.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DamRoleCategoriesResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.DamRoleCategoriesResponse} DamRoleCategoriesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamRoleCategoriesResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DamRoleCategoriesResponse message.
             * @function verify
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DamRoleCategoriesResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.damRoleCategories != null && message.hasOwnProperty("damRoleCategories")) {
                    if (!$util.isObject(message.damRoleCategories))
                        return "damRoleCategories: object expected";
                    var key = Object.keys(message.damRoleCategories);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.RoleCategory.verify(message.damRoleCategories[key[i]]);
                        if (error)
                            return "damRoleCategories." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DamRoleCategoriesResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.DamRoleCategoriesResponse} DamRoleCategoriesResponse
             */
            DamRoleCategoriesResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.DamRoleCategoriesResponse)
                    return object;
                var message = new $root.dam.v1.DamRoleCategoriesResponse();
                if (object.damRoleCategories) {
                    if (typeof object.damRoleCategories !== "object")
                        throw TypeError(".dam.v1.DamRoleCategoriesResponse.damRoleCategories: object expected");
                    message.damRoleCategories = {};
                    for (var keys = Object.keys(object.damRoleCategories), i = 0; i < keys.length; ++i) {
                        if (typeof object.damRoleCategories[keys[i]] !== "object")
                            throw TypeError(".dam.v1.DamRoleCategoriesResponse.damRoleCategories: object expected");
                        message.damRoleCategories[keys[i]] = $root.dam.v1.RoleCategory.fromObject(object.damRoleCategories[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a DamRoleCategoriesResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @static
             * @param {dam.v1.DamRoleCategoriesResponse} message DamRoleCategoriesResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DamRoleCategoriesResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.damRoleCategories = {};
                var keys2;
                if (message.damRoleCategories && (keys2 = Object.keys(message.damRoleCategories)).length) {
                    object.damRoleCategories = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.damRoleCategories[keys2[j]] = $root.dam.v1.RoleCategory.toObject(message.damRoleCategories[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this DamRoleCategoriesResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.DamRoleCategoriesResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DamRoleCategoriesResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DamRoleCategoriesResponse;
        })();

        v1.GetTestPersonasRequest = (function() {

            /**
             * Properties of a GetTestPersonasRequest.
             * @memberof dam.v1
             * @interface IGetTestPersonasRequest
             */

            /**
             * Constructs a new GetTestPersonasRequest.
             * @memberof dam.v1
             * @classdesc Represents a GetTestPersonasRequest.
             * @implements IGetTestPersonasRequest
             * @constructor
             * @param {dam.v1.IGetTestPersonasRequest=} [properties] Properties to set
             */
            function GetTestPersonasRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new GetTestPersonasRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {dam.v1.IGetTestPersonasRequest=} [properties] Properties to set
             * @returns {dam.v1.GetTestPersonasRequest} GetTestPersonasRequest instance
             */
            GetTestPersonasRequest.create = function create(properties) {
                return new GetTestPersonasRequest(properties);
            };

            /**
             * Encodes the specified GetTestPersonasRequest message. Does not implicitly {@link dam.v1.GetTestPersonasRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {dam.v1.IGetTestPersonasRequest} message GetTestPersonasRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestPersonasRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified GetTestPersonasRequest message, length delimited. Does not implicitly {@link dam.v1.GetTestPersonasRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {dam.v1.IGetTestPersonasRequest} message GetTestPersonasRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestPersonasRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTestPersonasRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetTestPersonasRequest} GetTestPersonasRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestPersonasRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTestPersonasRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTestPersonasRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetTestPersonasRequest} GetTestPersonasRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestPersonasRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTestPersonasRequest message.
             * @function verify
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTestPersonasRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a GetTestPersonasRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetTestPersonasRequest} GetTestPersonasRequest
             */
            GetTestPersonasRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetTestPersonasRequest)
                    return object;
                return new $root.dam.v1.GetTestPersonasRequest();
            };

            /**
             * Creates a plain object from a GetTestPersonasRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetTestPersonasRequest
             * @static
             * @param {dam.v1.GetTestPersonasRequest} message GetTestPersonasRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTestPersonasRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetTestPersonasRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.GetTestPersonasRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTestPersonasRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTestPersonasRequest;
        })();

        v1.GetTestPersonasResponse = (function() {

            /**
             * Properties of a GetTestPersonasResponse.
             * @memberof dam.v1
             * @interface IGetTestPersonasResponse
             * @property {Object.<string,dam.v1.ITestPersona>|null} [personas] GetTestPersonasResponse personas
             */

            /**
             * Constructs a new GetTestPersonasResponse.
             * @memberof dam.v1
             * @classdesc Represents a GetTestPersonasResponse.
             * @implements IGetTestPersonasResponse
             * @constructor
             * @param {dam.v1.IGetTestPersonasResponse=} [properties] Properties to set
             */
            function GetTestPersonasResponse(properties) {
                this.personas = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTestPersonasResponse personas.
             * @member {Object.<string,dam.v1.ITestPersona>} personas
             * @memberof dam.v1.GetTestPersonasResponse
             * @instance
             */
            GetTestPersonasResponse.prototype.personas = $util.emptyObject;

            /**
             * Creates a new GetTestPersonasResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {dam.v1.IGetTestPersonasResponse=} [properties] Properties to set
             * @returns {dam.v1.GetTestPersonasResponse} GetTestPersonasResponse instance
             */
            GetTestPersonasResponse.create = function create(properties) {
                return new GetTestPersonasResponse(properties);
            };

            /**
             * Encodes the specified GetTestPersonasResponse message. Does not implicitly {@link dam.v1.GetTestPersonasResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {dam.v1.IGetTestPersonasResponse} message GetTestPersonasResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestPersonasResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.personas != null && message.hasOwnProperty("personas"))
                    for (var keys = Object.keys(message.personas), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.TestPersona.encode(message.personas[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified GetTestPersonasResponse message, length delimited. Does not implicitly {@link dam.v1.GetTestPersonasResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {dam.v1.IGetTestPersonasResponse} message GetTestPersonasResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTestPersonasResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTestPersonasResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.GetTestPersonasResponse} GetTestPersonasResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestPersonasResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.GetTestPersonasResponse(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.personas === $util.emptyObject)
                            message.personas = {};
                        key = reader.string();
                        reader.pos++;
                        message.personas[key] = $root.dam.v1.TestPersona.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTestPersonasResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.GetTestPersonasResponse} GetTestPersonasResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTestPersonasResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTestPersonasResponse message.
             * @function verify
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTestPersonasResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.personas != null && message.hasOwnProperty("personas")) {
                    if (!$util.isObject(message.personas))
                        return "personas: object expected";
                    var key = Object.keys(message.personas);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.TestPersona.verify(message.personas[key[i]]);
                        if (error)
                            return "personas." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetTestPersonasResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.GetTestPersonasResponse} GetTestPersonasResponse
             */
            GetTestPersonasResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.GetTestPersonasResponse)
                    return object;
                var message = new $root.dam.v1.GetTestPersonasResponse();
                if (object.personas) {
                    if (typeof object.personas !== "object")
                        throw TypeError(".dam.v1.GetTestPersonasResponse.personas: object expected");
                    message.personas = {};
                    for (var keys = Object.keys(object.personas), i = 0; i < keys.length; ++i) {
                        if (typeof object.personas[keys[i]] !== "object")
                            throw TypeError(".dam.v1.GetTestPersonasResponse.personas: object expected");
                        message.personas[keys[i]] = $root.dam.v1.TestPersona.fromObject(object.personas[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTestPersonasResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.GetTestPersonasResponse
             * @static
             * @param {dam.v1.GetTestPersonasResponse} message GetTestPersonasResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTestPersonasResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.personas = {};
                var keys2;
                if (message.personas && (keys2 = Object.keys(message.personas)).length) {
                    object.personas = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.personas[keys2[j]] = $root.dam.v1.TestPersona.toObject(message.personas[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this GetTestPersonasResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.GetTestPersonasResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTestPersonasResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTestPersonasResponse;
        })();

        v1.ConfigModification = (function() {

            /**
             * Properties of a ConfigModification.
             * @memberof dam.v1
             * @interface IConfigModification
             * @property {number|Long|null} [revision] ConfigModification revision
             * @property {Object.<string,dam.v1.ConfigModification.IPersonaModification>|null} [testPersonas] ConfigModification testPersonas
             * @property {boolean|null} [dryRun] ConfigModification dryRun
             */

            /**
             * Constructs a new ConfigModification.
             * @memberof dam.v1
             * @classdesc Represents a ConfigModification.
             * @implements IConfigModification
             * @constructor
             * @param {dam.v1.IConfigModification=} [properties] Properties to set
             */
            function ConfigModification(properties) {
                this.testPersonas = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigModification revision.
             * @member {number|Long} revision
             * @memberof dam.v1.ConfigModification
             * @instance
             */
            ConfigModification.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ConfigModification testPersonas.
             * @member {Object.<string,dam.v1.ConfigModification.IPersonaModification>} testPersonas
             * @memberof dam.v1.ConfigModification
             * @instance
             */
            ConfigModification.prototype.testPersonas = $util.emptyObject;

            /**
             * ConfigModification dryRun.
             * @member {boolean} dryRun
             * @memberof dam.v1.ConfigModification
             * @instance
             */
            ConfigModification.prototype.dryRun = false;

            /**
             * Creates a new ConfigModification instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {dam.v1.IConfigModification=} [properties] Properties to set
             * @returns {dam.v1.ConfigModification} ConfigModification instance
             */
            ConfigModification.create = function create(properties) {
                return new ConfigModification(properties);
            };

            /**
             * Encodes the specified ConfigModification message. Does not implicitly {@link dam.v1.ConfigModification.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {dam.v1.IConfigModification} message ConfigModification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigModification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.revision != null && message.hasOwnProperty("revision"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.revision);
                if (message.testPersonas != null && message.hasOwnProperty("testPersonas"))
                    for (var keys = Object.keys(message.testPersonas), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dam.v1.ConfigModification.PersonaModification.encode(message.testPersonas[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.dryRun != null && message.hasOwnProperty("dryRun"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.dryRun);
                return writer;
            };

            /**
             * Encodes the specified ConfigModification message, length delimited. Does not implicitly {@link dam.v1.ConfigModification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {dam.v1.IConfigModification} message ConfigModification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigModification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigModification message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigModification} ConfigModification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigModification.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigModification(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.revision = reader.int64();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.testPersonas === $util.emptyObject)
                            message.testPersonas = {};
                        key = reader.string();
                        reader.pos++;
                        message.testPersonas[key] = $root.dam.v1.ConfigModification.PersonaModification.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.dryRun = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigModification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigModification} ConfigModification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigModification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigModification message.
             * @function verify
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigModification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                        return "revision: integer|Long expected";
                if (message.testPersonas != null && message.hasOwnProperty("testPersonas")) {
                    if (!$util.isObject(message.testPersonas))
                        return "testPersonas: object expected";
                    var key = Object.keys(message.testPersonas);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dam.v1.ConfigModification.PersonaModification.verify(message.testPersonas[key[i]]);
                        if (error)
                            return "testPersonas." + error;
                    }
                }
                if (message.dryRun != null && message.hasOwnProperty("dryRun"))
                    if (typeof message.dryRun !== "boolean")
                        return "dryRun: boolean expected";
                return null;
            };

            /**
             * Creates a ConfigModification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigModification} ConfigModification
             */
            ConfigModification.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigModification)
                    return object;
                var message = new $root.dam.v1.ConfigModification();
                if (object.revision != null)
                    if ($util.Long)
                        (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                    else if (typeof object.revision === "string")
                        message.revision = parseInt(object.revision, 10);
                    else if (typeof object.revision === "number")
                        message.revision = object.revision;
                    else if (typeof object.revision === "object")
                        message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
                if (object.testPersonas) {
                    if (typeof object.testPersonas !== "object")
                        throw TypeError(".dam.v1.ConfigModification.testPersonas: object expected");
                    message.testPersonas = {};
                    for (var keys = Object.keys(object.testPersonas), i = 0; i < keys.length; ++i) {
                        if (typeof object.testPersonas[keys[i]] !== "object")
                            throw TypeError(".dam.v1.ConfigModification.testPersonas: object expected");
                        message.testPersonas[keys[i]] = $root.dam.v1.ConfigModification.PersonaModification.fromObject(object.testPersonas[keys[i]]);
                    }
                }
                if (object.dryRun != null)
                    message.dryRun = Boolean(object.dryRun);
                return message;
            };

            /**
             * Creates a plain object from a ConfigModification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigModification
             * @static
             * @param {dam.v1.ConfigModification} message ConfigModification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigModification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.testPersonas = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.revision = options.longs === String ? "0" : 0;
                    object.dryRun = false;
                }
                if (message.revision != null && message.hasOwnProperty("revision"))
                    if (typeof message.revision === "number")
                        object.revision = options.longs === String ? String(message.revision) : message.revision;
                    else
                        object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
                var keys2;
                if (message.testPersonas && (keys2 = Object.keys(message.testPersonas)).length) {
                    object.testPersonas = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.testPersonas[keys2[j]] = $root.dam.v1.ConfigModification.PersonaModification.toObject(message.testPersonas[keys2[j]], options);
                }
                if (message.dryRun != null && message.hasOwnProperty("dryRun"))
                    object.dryRun = message.dryRun;
                return object;
            };

            /**
             * Converts this ConfigModification to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigModification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigModification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            ConfigModification.PersonaModification = (function() {

                /**
                 * Properties of a PersonaModification.
                 * @memberof dam.v1.ConfigModification
                 * @interface IPersonaModification
                 * @property {Object.<string,dam.v1.IAccessList>|null} [resources] PersonaModification resources
                 * @property {Object.<string,dam.v1.IAccessList>|null} [addResources] PersonaModification addResources
                 * @property {Object.<string,dam.v1.IAccessList>|null} [removeResources] PersonaModification removeResources
                 */

                /**
                 * Constructs a new PersonaModification.
                 * @memberof dam.v1.ConfigModification
                 * @classdesc Represents a PersonaModification.
                 * @implements IPersonaModification
                 * @constructor
                 * @param {dam.v1.ConfigModification.IPersonaModification=} [properties] Properties to set
                 */
                function PersonaModification(properties) {
                    this.resources = {};
                    this.addResources = {};
                    this.removeResources = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PersonaModification resources.
                 * @member {Object.<string,dam.v1.IAccessList>} resources
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @instance
                 */
                PersonaModification.prototype.resources = $util.emptyObject;

                /**
                 * PersonaModification addResources.
                 * @member {Object.<string,dam.v1.IAccessList>} addResources
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @instance
                 */
                PersonaModification.prototype.addResources = $util.emptyObject;

                /**
                 * PersonaModification removeResources.
                 * @member {Object.<string,dam.v1.IAccessList>} removeResources
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @instance
                 */
                PersonaModification.prototype.removeResources = $util.emptyObject;

                /**
                 * Creates a new PersonaModification instance using the specified properties.
                 * @function create
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {dam.v1.ConfigModification.IPersonaModification=} [properties] Properties to set
                 * @returns {dam.v1.ConfigModification.PersonaModification} PersonaModification instance
                 */
                PersonaModification.create = function create(properties) {
                    return new PersonaModification(properties);
                };

                /**
                 * Encodes the specified PersonaModification message. Does not implicitly {@link dam.v1.ConfigModification.PersonaModification.verify|verify} messages.
                 * @function encode
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {dam.v1.ConfigModification.IPersonaModification} message PersonaModification message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PersonaModification.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.resources != null && message.hasOwnProperty("resources"))
                        for (var keys = Object.keys(message.resources), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.dam.v1.AccessList.encode(message.resources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    if (message.addResources != null && message.hasOwnProperty("addResources"))
                        for (var keys = Object.keys(message.addResources), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.dam.v1.AccessList.encode(message.addResources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    if (message.removeResources != null && message.hasOwnProperty("removeResources"))
                        for (var keys = Object.keys(message.removeResources), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.dam.v1.AccessList.encode(message.removeResources[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    return writer;
                };

                /**
                 * Encodes the specified PersonaModification message, length delimited. Does not implicitly {@link dam.v1.ConfigModification.PersonaModification.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {dam.v1.ConfigModification.IPersonaModification} message PersonaModification message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PersonaModification.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PersonaModification message from the specified reader or buffer.
                 * @function decode
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dam.v1.ConfigModification.PersonaModification} PersonaModification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PersonaModification.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigModification.PersonaModification(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            reader.skip().pos++;
                            if (message.resources === $util.emptyObject)
                                message.resources = {};
                            key = reader.string();
                            reader.pos++;
                            message.resources[key] = $root.dam.v1.AccessList.decode(reader, reader.uint32());
                            break;
                        case 2:
                            reader.skip().pos++;
                            if (message.addResources === $util.emptyObject)
                                message.addResources = {};
                            key = reader.string();
                            reader.pos++;
                            message.addResources[key] = $root.dam.v1.AccessList.decode(reader, reader.uint32());
                            break;
                        case 3:
                            reader.skip().pos++;
                            if (message.removeResources === $util.emptyObject)
                                message.removeResources = {};
                            key = reader.string();
                            reader.pos++;
                            message.removeResources[key] = $root.dam.v1.AccessList.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PersonaModification message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dam.v1.ConfigModification.PersonaModification} PersonaModification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PersonaModification.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PersonaModification message.
                 * @function verify
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PersonaModification.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.resources != null && message.hasOwnProperty("resources")) {
                        if (!$util.isObject(message.resources))
                            return "resources: object expected";
                        var key = Object.keys(message.resources);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.dam.v1.AccessList.verify(message.resources[key[i]]);
                            if (error)
                                return "resources." + error;
                        }
                    }
                    if (message.addResources != null && message.hasOwnProperty("addResources")) {
                        if (!$util.isObject(message.addResources))
                            return "addResources: object expected";
                        var key = Object.keys(message.addResources);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.dam.v1.AccessList.verify(message.addResources[key[i]]);
                            if (error)
                                return "addResources." + error;
                        }
                    }
                    if (message.removeResources != null && message.hasOwnProperty("removeResources")) {
                        if (!$util.isObject(message.removeResources))
                            return "removeResources: object expected";
                        var key = Object.keys(message.removeResources);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.dam.v1.AccessList.verify(message.removeResources[key[i]]);
                            if (error)
                                return "removeResources." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a PersonaModification message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dam.v1.ConfigModification.PersonaModification} PersonaModification
                 */
                PersonaModification.fromObject = function fromObject(object) {
                    if (object instanceof $root.dam.v1.ConfigModification.PersonaModification)
                        return object;
                    var message = new $root.dam.v1.ConfigModification.PersonaModification();
                    if (object.resources) {
                        if (typeof object.resources !== "object")
                            throw TypeError(".dam.v1.ConfigModification.PersonaModification.resources: object expected");
                        message.resources = {};
                        for (var keys = Object.keys(object.resources), i = 0; i < keys.length; ++i) {
                            if (typeof object.resources[keys[i]] !== "object")
                                throw TypeError(".dam.v1.ConfigModification.PersonaModification.resources: object expected");
                            message.resources[keys[i]] = $root.dam.v1.AccessList.fromObject(object.resources[keys[i]]);
                        }
                    }
                    if (object.addResources) {
                        if (typeof object.addResources !== "object")
                            throw TypeError(".dam.v1.ConfigModification.PersonaModification.addResources: object expected");
                        message.addResources = {};
                        for (var keys = Object.keys(object.addResources), i = 0; i < keys.length; ++i) {
                            if (typeof object.addResources[keys[i]] !== "object")
                                throw TypeError(".dam.v1.ConfigModification.PersonaModification.addResources: object expected");
                            message.addResources[keys[i]] = $root.dam.v1.AccessList.fromObject(object.addResources[keys[i]]);
                        }
                    }
                    if (object.removeResources) {
                        if (typeof object.removeResources !== "object")
                            throw TypeError(".dam.v1.ConfigModification.PersonaModification.removeResources: object expected");
                        message.removeResources = {};
                        for (var keys = Object.keys(object.removeResources), i = 0; i < keys.length; ++i) {
                            if (typeof object.removeResources[keys[i]] !== "object")
                                throw TypeError(".dam.v1.ConfigModification.PersonaModification.removeResources: object expected");
                            message.removeResources[keys[i]] = $root.dam.v1.AccessList.fromObject(object.removeResources[keys[i]]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a PersonaModification message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @static
                 * @param {dam.v1.ConfigModification.PersonaModification} message PersonaModification
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PersonaModification.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults) {
                        object.resources = {};
                        object.addResources = {};
                        object.removeResources = {};
                    }
                    var keys2;
                    if (message.resources && (keys2 = Object.keys(message.resources)).length) {
                        object.resources = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.resources[keys2[j]] = $root.dam.v1.AccessList.toObject(message.resources[keys2[j]], options);
                    }
                    if (message.addResources && (keys2 = Object.keys(message.addResources)).length) {
                        object.addResources = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.addResources[keys2[j]] = $root.dam.v1.AccessList.toObject(message.addResources[keys2[j]], options);
                    }
                    if (message.removeResources && (keys2 = Object.keys(message.removeResources)).length) {
                        object.removeResources = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.removeResources[keys2[j]] = $root.dam.v1.AccessList.toObject(message.removeResources[keys2[j]], options);
                    }
                    return object;
                };

                /**
                 * Converts this PersonaModification to JSON.
                 * @function toJSON
                 * @memberof dam.v1.ConfigModification.PersonaModification
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PersonaModification.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return PersonaModification;
            })();

            return ConfigModification;
        })();

        v1.ConfigResponse = (function() {

            /**
             * Properties of a ConfigResponse.
             * @memberof dam.v1
             * @interface IConfigResponse
             */

            /**
             * Constructs a new ConfigResponse.
             * @memberof dam.v1
             * @classdesc Represents a ConfigResponse.
             * @implements IConfigResponse
             * @constructor
             * @param {dam.v1.IConfigResponse=} [properties] Properties to set
             */
            function ConfigResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new ConfigResponse instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {dam.v1.IConfigResponse=} [properties] Properties to set
             * @returns {dam.v1.ConfigResponse} ConfigResponse instance
             */
            ConfigResponse.create = function create(properties) {
                return new ConfigResponse(properties);
            };

            /**
             * Encodes the specified ConfigResponse message. Does not implicitly {@link dam.v1.ConfigResponse.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {dam.v1.IConfigResponse} message ConfigResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified ConfigResponse message, length delimited. Does not implicitly {@link dam.v1.ConfigResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {dam.v1.IConfigResponse} message ConfigResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigResponse message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigResponse} ConfigResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigResponse} ConfigResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigResponse message.
             * @function verify
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a ConfigResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigResponse} ConfigResponse
             */
            ConfigResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigResponse)
                    return object;
                return new $root.dam.v1.ConfigResponse();
            };

            /**
             * Creates a plain object from a ConfigResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigResponse
             * @static
             * @param {dam.v1.ConfigResponse} message ConfigResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ConfigResponse to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigResponse;
        })();

        v1.ConfigRequest = (function() {

            /**
             * Properties of a ConfigRequest.
             * @memberof dam.v1
             * @interface IConfigRequest
             * @property {dam.v1.IDamConfig|null} [item] ConfigRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigRequest modification
             */

            /**
             * Constructs a new ConfigRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigRequest.
             * @implements IConfigRequest
             * @constructor
             * @param {dam.v1.IConfigRequest=} [properties] Properties to set
             */
            function ConfigRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigRequest item.
             * @member {dam.v1.IDamConfig|null|undefined} item
             * @memberof dam.v1.ConfigRequest
             * @instance
             */
            ConfigRequest.prototype.item = null;

            /**
             * ConfigRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigRequest
             * @instance
             */
            ConfigRequest.prototype.modification = null;

            /**
             * Creates a new ConfigRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {dam.v1.IConfigRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigRequest} ConfigRequest instance
             */
            ConfigRequest.create = function create(properties) {
                return new ConfigRequest(properties);
            };

            /**
             * Encodes the specified ConfigRequest message. Does not implicitly {@link dam.v1.ConfigRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {dam.v1.IConfigRequest} message ConfigRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.DamConfig.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {dam.v1.IConfigRequest} message ConfigRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigRequest} ConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.DamConfig.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigRequest} ConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigRequest message.
             * @function verify
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.DamConfig.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigRequest} ConfigRequest
             */
            ConfigRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigRequest)
                    return object;
                var message = new $root.dam.v1.ConfigRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigRequest.item: object expected");
                    message.item = $root.dam.v1.DamConfig.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigRequest
             * @static
             * @param {dam.v1.ConfigRequest} message ConfigRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.DamConfig.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigRequest;
        })();

        v1.ConfigResourceRequest = (function() {

            /**
             * Properties of a ConfigResourceRequest.
             * @memberof dam.v1
             * @interface IConfigResourceRequest
             * @property {dam.v1.IResource|null} [item] ConfigResourceRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigResourceRequest modification
             */

            /**
             * Constructs a new ConfigResourceRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigResourceRequest.
             * @implements IConfigResourceRequest
             * @constructor
             * @param {dam.v1.IConfigResourceRequest=} [properties] Properties to set
             */
            function ConfigResourceRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigResourceRequest item.
             * @member {dam.v1.IResource|null|undefined} item
             * @memberof dam.v1.ConfigResourceRequest
             * @instance
             */
            ConfigResourceRequest.prototype.item = null;

            /**
             * ConfigResourceRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigResourceRequest
             * @instance
             */
            ConfigResourceRequest.prototype.modification = null;

            /**
             * Creates a new ConfigResourceRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {dam.v1.IConfigResourceRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigResourceRequest} ConfigResourceRequest instance
             */
            ConfigResourceRequest.create = function create(properties) {
                return new ConfigResourceRequest(properties);
            };

            /**
             * Encodes the specified ConfigResourceRequest message. Does not implicitly {@link dam.v1.ConfigResourceRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {dam.v1.IConfigResourceRequest} message ConfigResourceRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigResourceRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.Resource.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigResourceRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigResourceRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {dam.v1.IConfigResourceRequest} message ConfigResourceRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigResourceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigResourceRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigResourceRequest} ConfigResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigResourceRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigResourceRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.Resource.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigResourceRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigResourceRequest} ConfigResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigResourceRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigResourceRequest message.
             * @function verify
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigResourceRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.Resource.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigResourceRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigResourceRequest} ConfigResourceRequest
             */
            ConfigResourceRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigResourceRequest)
                    return object;
                var message = new $root.dam.v1.ConfigResourceRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigResourceRequest.item: object expected");
                    message.item = $root.dam.v1.Resource.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigResourceRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigResourceRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigResourceRequest
             * @static
             * @param {dam.v1.ConfigResourceRequest} message ConfigResourceRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigResourceRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.Resource.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigResourceRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigResourceRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigResourceRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigResourceRequest;
        })();

        v1.ConfigViewRequest = (function() {

            /**
             * Properties of a ConfigViewRequest.
             * @memberof dam.v1
             * @interface IConfigViewRequest
             * @property {dam.v1.IView|null} [item] ConfigViewRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigViewRequest modification
             */

            /**
             * Constructs a new ConfigViewRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigViewRequest.
             * @implements IConfigViewRequest
             * @constructor
             * @param {dam.v1.IConfigViewRequest=} [properties] Properties to set
             */
            function ConfigViewRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigViewRequest item.
             * @member {dam.v1.IView|null|undefined} item
             * @memberof dam.v1.ConfigViewRequest
             * @instance
             */
            ConfigViewRequest.prototype.item = null;

            /**
             * ConfigViewRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigViewRequest
             * @instance
             */
            ConfigViewRequest.prototype.modification = null;

            /**
             * Creates a new ConfigViewRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {dam.v1.IConfigViewRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigViewRequest} ConfigViewRequest instance
             */
            ConfigViewRequest.create = function create(properties) {
                return new ConfigViewRequest(properties);
            };

            /**
             * Encodes the specified ConfigViewRequest message. Does not implicitly {@link dam.v1.ConfigViewRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {dam.v1.IConfigViewRequest} message ConfigViewRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigViewRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.View.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigViewRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigViewRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {dam.v1.IConfigViewRequest} message ConfigViewRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigViewRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigViewRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigViewRequest} ConfigViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigViewRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigViewRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.View.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigViewRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigViewRequest} ConfigViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigViewRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigViewRequest message.
             * @function verify
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigViewRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.View.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigViewRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigViewRequest} ConfigViewRequest
             */
            ConfigViewRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigViewRequest)
                    return object;
                var message = new $root.dam.v1.ConfigViewRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigViewRequest.item: object expected");
                    message.item = $root.dam.v1.View.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigViewRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigViewRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigViewRequest
             * @static
             * @param {dam.v1.ConfigViewRequest} message ConfigViewRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigViewRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.View.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigViewRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigViewRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigViewRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigViewRequest;
        })();

        v1.ConfigTrustedPassportIssuerRequest = (function() {

            /**
             * Properties of a ConfigTrustedPassportIssuerRequest.
             * @memberof dam.v1
             * @interface IConfigTrustedPassportIssuerRequest
             * @property {dam.v1.ITrustedPassportIssuer|null} [item] ConfigTrustedPassportIssuerRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigTrustedPassportIssuerRequest modification
             */

            /**
             * Constructs a new ConfigTrustedPassportIssuerRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigTrustedPassportIssuerRequest.
             * @implements IConfigTrustedPassportIssuerRequest
             * @constructor
             * @param {dam.v1.IConfigTrustedPassportIssuerRequest=} [properties] Properties to set
             */
            function ConfigTrustedPassportIssuerRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigTrustedPassportIssuerRequest item.
             * @member {dam.v1.ITrustedPassportIssuer|null|undefined} item
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @instance
             */
            ConfigTrustedPassportIssuerRequest.prototype.item = null;

            /**
             * ConfigTrustedPassportIssuerRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @instance
             */
            ConfigTrustedPassportIssuerRequest.prototype.modification = null;

            /**
             * Creates a new ConfigTrustedPassportIssuerRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {dam.v1.IConfigTrustedPassportIssuerRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigTrustedPassportIssuerRequest} ConfigTrustedPassportIssuerRequest instance
             */
            ConfigTrustedPassportIssuerRequest.create = function create(properties) {
                return new ConfigTrustedPassportIssuerRequest(properties);
            };

            /**
             * Encodes the specified ConfigTrustedPassportIssuerRequest message. Does not implicitly {@link dam.v1.ConfigTrustedPassportIssuerRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {dam.v1.IConfigTrustedPassportIssuerRequest} message ConfigTrustedPassportIssuerRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigTrustedPassportIssuerRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.TrustedPassportIssuer.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigTrustedPassportIssuerRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigTrustedPassportIssuerRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {dam.v1.IConfigTrustedPassportIssuerRequest} message ConfigTrustedPassportIssuerRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigTrustedPassportIssuerRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigTrustedPassportIssuerRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigTrustedPassportIssuerRequest} ConfigTrustedPassportIssuerRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigTrustedPassportIssuerRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigTrustedPassportIssuerRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.TrustedPassportIssuer.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigTrustedPassportIssuerRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigTrustedPassportIssuerRequest} ConfigTrustedPassportIssuerRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigTrustedPassportIssuerRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigTrustedPassportIssuerRequest message.
             * @function verify
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigTrustedPassportIssuerRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.TrustedPassportIssuer.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigTrustedPassportIssuerRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigTrustedPassportIssuerRequest} ConfigTrustedPassportIssuerRequest
             */
            ConfigTrustedPassportIssuerRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigTrustedPassportIssuerRequest)
                    return object;
                var message = new $root.dam.v1.ConfigTrustedPassportIssuerRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigTrustedPassportIssuerRequest.item: object expected");
                    message.item = $root.dam.v1.TrustedPassportIssuer.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigTrustedPassportIssuerRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigTrustedPassportIssuerRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @static
             * @param {dam.v1.ConfigTrustedPassportIssuerRequest} message ConfigTrustedPassportIssuerRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigTrustedPassportIssuerRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.TrustedPassportIssuer.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigTrustedPassportIssuerRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigTrustedPassportIssuerRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigTrustedPassportIssuerRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigTrustedPassportIssuerRequest;
        })();

        v1.ConfigTrustedSourceRequest = (function() {

            /**
             * Properties of a ConfigTrustedSourceRequest.
             * @memberof dam.v1
             * @interface IConfigTrustedSourceRequest
             * @property {dam.v1.ITrustedSource|null} [item] ConfigTrustedSourceRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigTrustedSourceRequest modification
             */

            /**
             * Constructs a new ConfigTrustedSourceRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigTrustedSourceRequest.
             * @implements IConfigTrustedSourceRequest
             * @constructor
             * @param {dam.v1.IConfigTrustedSourceRequest=} [properties] Properties to set
             */
            function ConfigTrustedSourceRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigTrustedSourceRequest item.
             * @member {dam.v1.ITrustedSource|null|undefined} item
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @instance
             */
            ConfigTrustedSourceRequest.prototype.item = null;

            /**
             * ConfigTrustedSourceRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @instance
             */
            ConfigTrustedSourceRequest.prototype.modification = null;

            /**
             * Creates a new ConfigTrustedSourceRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {dam.v1.IConfigTrustedSourceRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigTrustedSourceRequest} ConfigTrustedSourceRequest instance
             */
            ConfigTrustedSourceRequest.create = function create(properties) {
                return new ConfigTrustedSourceRequest(properties);
            };

            /**
             * Encodes the specified ConfigTrustedSourceRequest message. Does not implicitly {@link dam.v1.ConfigTrustedSourceRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {dam.v1.IConfigTrustedSourceRequest} message ConfigTrustedSourceRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigTrustedSourceRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.TrustedSource.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigTrustedSourceRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigTrustedSourceRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {dam.v1.IConfigTrustedSourceRequest} message ConfigTrustedSourceRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigTrustedSourceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigTrustedSourceRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigTrustedSourceRequest} ConfigTrustedSourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigTrustedSourceRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigTrustedSourceRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.TrustedSource.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigTrustedSourceRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigTrustedSourceRequest} ConfigTrustedSourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigTrustedSourceRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigTrustedSourceRequest message.
             * @function verify
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigTrustedSourceRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.TrustedSource.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigTrustedSourceRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigTrustedSourceRequest} ConfigTrustedSourceRequest
             */
            ConfigTrustedSourceRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigTrustedSourceRequest)
                    return object;
                var message = new $root.dam.v1.ConfigTrustedSourceRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigTrustedSourceRequest.item: object expected");
                    message.item = $root.dam.v1.TrustedSource.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigTrustedSourceRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigTrustedSourceRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @static
             * @param {dam.v1.ConfigTrustedSourceRequest} message ConfigTrustedSourceRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigTrustedSourceRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.TrustedSource.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigTrustedSourceRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigTrustedSourceRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigTrustedSourceRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigTrustedSourceRequest;
        })();

        v1.ConfigPolicyRequest = (function() {

            /**
             * Properties of a ConfigPolicyRequest.
             * @memberof dam.v1
             * @interface IConfigPolicyRequest
             * @property {dam.v1.IPolicy|null} [item] ConfigPolicyRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigPolicyRequest modification
             */

            /**
             * Constructs a new ConfigPolicyRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigPolicyRequest.
             * @implements IConfigPolicyRequest
             * @constructor
             * @param {dam.v1.IConfigPolicyRequest=} [properties] Properties to set
             */
            function ConfigPolicyRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigPolicyRequest item.
             * @member {dam.v1.IPolicy|null|undefined} item
             * @memberof dam.v1.ConfigPolicyRequest
             * @instance
             */
            ConfigPolicyRequest.prototype.item = null;

            /**
             * ConfigPolicyRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigPolicyRequest
             * @instance
             */
            ConfigPolicyRequest.prototype.modification = null;

            /**
             * Creates a new ConfigPolicyRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {dam.v1.IConfigPolicyRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigPolicyRequest} ConfigPolicyRequest instance
             */
            ConfigPolicyRequest.create = function create(properties) {
                return new ConfigPolicyRequest(properties);
            };

            /**
             * Encodes the specified ConfigPolicyRequest message. Does not implicitly {@link dam.v1.ConfigPolicyRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {dam.v1.IConfigPolicyRequest} message ConfigPolicyRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigPolicyRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.Policy.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigPolicyRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigPolicyRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {dam.v1.IConfigPolicyRequest} message ConfigPolicyRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigPolicyRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigPolicyRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigPolicyRequest} ConfigPolicyRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigPolicyRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigPolicyRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.Policy.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigPolicyRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigPolicyRequest} ConfigPolicyRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigPolicyRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigPolicyRequest message.
             * @function verify
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigPolicyRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.Policy.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigPolicyRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigPolicyRequest} ConfigPolicyRequest
             */
            ConfigPolicyRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigPolicyRequest)
                    return object;
                var message = new $root.dam.v1.ConfigPolicyRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigPolicyRequest.item: object expected");
                    message.item = $root.dam.v1.Policy.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigPolicyRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigPolicyRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigPolicyRequest
             * @static
             * @param {dam.v1.ConfigPolicyRequest} message ConfigPolicyRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigPolicyRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.Policy.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigPolicyRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigPolicyRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigPolicyRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigPolicyRequest;
        })();

        v1.ConfigOptionsRequest = (function() {

            /**
             * Properties of a ConfigOptionsRequest.
             * @memberof dam.v1
             * @interface IConfigOptionsRequest
             * @property {dam.v1.IConfigOptions|null} [item] ConfigOptionsRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigOptionsRequest modification
             */

            /**
             * Constructs a new ConfigOptionsRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigOptionsRequest.
             * @implements IConfigOptionsRequest
             * @constructor
             * @param {dam.v1.IConfigOptionsRequest=} [properties] Properties to set
             */
            function ConfigOptionsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigOptionsRequest item.
             * @member {dam.v1.IConfigOptions|null|undefined} item
             * @memberof dam.v1.ConfigOptionsRequest
             * @instance
             */
            ConfigOptionsRequest.prototype.item = null;

            /**
             * ConfigOptionsRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigOptionsRequest
             * @instance
             */
            ConfigOptionsRequest.prototype.modification = null;

            /**
             * Creates a new ConfigOptionsRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {dam.v1.IConfigOptionsRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigOptionsRequest} ConfigOptionsRequest instance
             */
            ConfigOptionsRequest.create = function create(properties) {
                return new ConfigOptionsRequest(properties);
            };

            /**
             * Encodes the specified ConfigOptionsRequest message. Does not implicitly {@link dam.v1.ConfigOptionsRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {dam.v1.IConfigOptionsRequest} message ConfigOptionsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigOptionsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.ConfigOptions.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigOptionsRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigOptionsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {dam.v1.IConfigOptionsRequest} message ConfigOptionsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigOptionsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigOptionsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigOptionsRequest} ConfigOptionsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigOptionsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigOptionsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.ConfigOptions.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigOptionsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigOptionsRequest} ConfigOptionsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigOptionsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigOptionsRequest message.
             * @function verify
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigOptionsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.ConfigOptions.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigOptionsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigOptionsRequest} ConfigOptionsRequest
             */
            ConfigOptionsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigOptionsRequest)
                    return object;
                var message = new $root.dam.v1.ConfigOptionsRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigOptionsRequest.item: object expected");
                    message.item = $root.dam.v1.ConfigOptions.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigOptionsRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigOptionsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigOptionsRequest
             * @static
             * @param {dam.v1.ConfigOptionsRequest} message ConfigOptionsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigOptionsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.ConfigOptions.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigOptionsRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigOptionsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigOptionsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigOptionsRequest;
        })();

        v1.ConfigClaimDefinitionRequest = (function() {

            /**
             * Properties of a ConfigClaimDefinitionRequest.
             * @memberof dam.v1
             * @interface IConfigClaimDefinitionRequest
             * @property {dam.v1.IClaimDefinition|null} [item] ConfigClaimDefinitionRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigClaimDefinitionRequest modification
             */

            /**
             * Constructs a new ConfigClaimDefinitionRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigClaimDefinitionRequest.
             * @implements IConfigClaimDefinitionRequest
             * @constructor
             * @param {dam.v1.IConfigClaimDefinitionRequest=} [properties] Properties to set
             */
            function ConfigClaimDefinitionRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigClaimDefinitionRequest item.
             * @member {dam.v1.IClaimDefinition|null|undefined} item
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @instance
             */
            ConfigClaimDefinitionRequest.prototype.item = null;

            /**
             * ConfigClaimDefinitionRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @instance
             */
            ConfigClaimDefinitionRequest.prototype.modification = null;

            /**
             * Creates a new ConfigClaimDefinitionRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {dam.v1.IConfigClaimDefinitionRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigClaimDefinitionRequest} ConfigClaimDefinitionRequest instance
             */
            ConfigClaimDefinitionRequest.create = function create(properties) {
                return new ConfigClaimDefinitionRequest(properties);
            };

            /**
             * Encodes the specified ConfigClaimDefinitionRequest message. Does not implicitly {@link dam.v1.ConfigClaimDefinitionRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {dam.v1.IConfigClaimDefinitionRequest} message ConfigClaimDefinitionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigClaimDefinitionRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.ClaimDefinition.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigClaimDefinitionRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigClaimDefinitionRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {dam.v1.IConfigClaimDefinitionRequest} message ConfigClaimDefinitionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigClaimDefinitionRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigClaimDefinitionRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigClaimDefinitionRequest} ConfigClaimDefinitionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigClaimDefinitionRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigClaimDefinitionRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.ClaimDefinition.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigClaimDefinitionRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigClaimDefinitionRequest} ConfigClaimDefinitionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigClaimDefinitionRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigClaimDefinitionRequest message.
             * @function verify
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigClaimDefinitionRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.ClaimDefinition.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigClaimDefinitionRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigClaimDefinitionRequest} ConfigClaimDefinitionRequest
             */
            ConfigClaimDefinitionRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigClaimDefinitionRequest)
                    return object;
                var message = new $root.dam.v1.ConfigClaimDefinitionRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigClaimDefinitionRequest.item: object expected");
                    message.item = $root.dam.v1.ClaimDefinition.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigClaimDefinitionRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigClaimDefinitionRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @static
             * @param {dam.v1.ConfigClaimDefinitionRequest} message ConfigClaimDefinitionRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigClaimDefinitionRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.ClaimDefinition.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigClaimDefinitionRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigClaimDefinitionRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigClaimDefinitionRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigClaimDefinitionRequest;
        })();

        v1.ConfigServiceTemplateRequest = (function() {

            /**
             * Properties of a ConfigServiceTemplateRequest.
             * @memberof dam.v1
             * @interface IConfigServiceTemplateRequest
             * @property {dam.v1.IServiceTemplate|null} [item] ConfigServiceTemplateRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigServiceTemplateRequest modification
             */

            /**
             * Constructs a new ConfigServiceTemplateRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigServiceTemplateRequest.
             * @implements IConfigServiceTemplateRequest
             * @constructor
             * @param {dam.v1.IConfigServiceTemplateRequest=} [properties] Properties to set
             */
            function ConfigServiceTemplateRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigServiceTemplateRequest item.
             * @member {dam.v1.IServiceTemplate|null|undefined} item
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @instance
             */
            ConfigServiceTemplateRequest.prototype.item = null;

            /**
             * ConfigServiceTemplateRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @instance
             */
            ConfigServiceTemplateRequest.prototype.modification = null;

            /**
             * Creates a new ConfigServiceTemplateRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {dam.v1.IConfigServiceTemplateRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigServiceTemplateRequest} ConfigServiceTemplateRequest instance
             */
            ConfigServiceTemplateRequest.create = function create(properties) {
                return new ConfigServiceTemplateRequest(properties);
            };

            /**
             * Encodes the specified ConfigServiceTemplateRequest message. Does not implicitly {@link dam.v1.ConfigServiceTemplateRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {dam.v1.IConfigServiceTemplateRequest} message ConfigServiceTemplateRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigServiceTemplateRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.ServiceTemplate.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigServiceTemplateRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigServiceTemplateRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {dam.v1.IConfigServiceTemplateRequest} message ConfigServiceTemplateRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigServiceTemplateRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigServiceTemplateRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigServiceTemplateRequest} ConfigServiceTemplateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigServiceTemplateRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigServiceTemplateRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.ServiceTemplate.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigServiceTemplateRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigServiceTemplateRequest} ConfigServiceTemplateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigServiceTemplateRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigServiceTemplateRequest message.
             * @function verify
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigServiceTemplateRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.ServiceTemplate.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigServiceTemplateRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigServiceTemplateRequest} ConfigServiceTemplateRequest
             */
            ConfigServiceTemplateRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigServiceTemplateRequest)
                    return object;
                var message = new $root.dam.v1.ConfigServiceTemplateRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigServiceTemplateRequest.item: object expected");
                    message.item = $root.dam.v1.ServiceTemplate.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigServiceTemplateRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigServiceTemplateRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @static
             * @param {dam.v1.ConfigServiceTemplateRequest} message ConfigServiceTemplateRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigServiceTemplateRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.ServiceTemplate.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigServiceTemplateRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigServiceTemplateRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigServiceTemplateRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigServiceTemplateRequest;
        })();

        v1.ConfigTestPersonaRequest = (function() {

            /**
             * Properties of a ConfigTestPersonaRequest.
             * @memberof dam.v1
             * @interface IConfigTestPersonaRequest
             * @property {dam.v1.ITestPersona|null} [item] ConfigTestPersonaRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigTestPersonaRequest modification
             */

            /**
             * Constructs a new ConfigTestPersonaRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigTestPersonaRequest.
             * @implements IConfigTestPersonaRequest
             * @constructor
             * @param {dam.v1.IConfigTestPersonaRequest=} [properties] Properties to set
             */
            function ConfigTestPersonaRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigTestPersonaRequest item.
             * @member {dam.v1.ITestPersona|null|undefined} item
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @instance
             */
            ConfigTestPersonaRequest.prototype.item = null;

            /**
             * ConfigTestPersonaRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @instance
             */
            ConfigTestPersonaRequest.prototype.modification = null;

            /**
             * Creates a new ConfigTestPersonaRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {dam.v1.IConfigTestPersonaRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigTestPersonaRequest} ConfigTestPersonaRequest instance
             */
            ConfigTestPersonaRequest.create = function create(properties) {
                return new ConfigTestPersonaRequest(properties);
            };

            /**
             * Encodes the specified ConfigTestPersonaRequest message. Does not implicitly {@link dam.v1.ConfigTestPersonaRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {dam.v1.IConfigTestPersonaRequest} message ConfigTestPersonaRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigTestPersonaRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.TestPersona.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigTestPersonaRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigTestPersonaRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {dam.v1.IConfigTestPersonaRequest} message ConfigTestPersonaRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigTestPersonaRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigTestPersonaRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigTestPersonaRequest} ConfigTestPersonaRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigTestPersonaRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigTestPersonaRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.TestPersona.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigTestPersonaRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigTestPersonaRequest} ConfigTestPersonaRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigTestPersonaRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigTestPersonaRequest message.
             * @function verify
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigTestPersonaRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.TestPersona.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigTestPersonaRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigTestPersonaRequest} ConfigTestPersonaRequest
             */
            ConfigTestPersonaRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigTestPersonaRequest)
                    return object;
                var message = new $root.dam.v1.ConfigTestPersonaRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigTestPersonaRequest.item: object expected");
                    message.item = $root.dam.v1.TestPersona.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigTestPersonaRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigTestPersonaRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @static
             * @param {dam.v1.ConfigTestPersonaRequest} message ConfigTestPersonaRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigTestPersonaRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.TestPersona.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigTestPersonaRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigTestPersonaRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigTestPersonaRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigTestPersonaRequest;
        })();

        v1.ConfigClientRequest = (function() {

            /**
             * Properties of a ConfigClientRequest.
             * @memberof dam.v1
             * @interface IConfigClientRequest
             * @property {dam.v1.IClient|null} [item] ConfigClientRequest item
             * @property {dam.v1.IConfigModification|null} [modification] ConfigClientRequest modification
             */

            /**
             * Constructs a new ConfigClientRequest.
             * @memberof dam.v1
             * @classdesc Represents a ConfigClientRequest.
             * @implements IConfigClientRequest
             * @constructor
             * @param {dam.v1.IConfigClientRequest=} [properties] Properties to set
             */
            function ConfigClientRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigClientRequest item.
             * @member {dam.v1.IClient|null|undefined} item
             * @memberof dam.v1.ConfigClientRequest
             * @instance
             */
            ConfigClientRequest.prototype.item = null;

            /**
             * ConfigClientRequest modification.
             * @member {dam.v1.IConfigModification|null|undefined} modification
             * @memberof dam.v1.ConfigClientRequest
             * @instance
             */
            ConfigClientRequest.prototype.modification = null;

            /**
             * Creates a new ConfigClientRequest instance using the specified properties.
             * @function create
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {dam.v1.IConfigClientRequest=} [properties] Properties to set
             * @returns {dam.v1.ConfigClientRequest} ConfigClientRequest instance
             */
            ConfigClientRequest.create = function create(properties) {
                return new ConfigClientRequest(properties);
            };

            /**
             * Encodes the specified ConfigClientRequest message. Does not implicitly {@link dam.v1.ConfigClientRequest.verify|verify} messages.
             * @function encode
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {dam.v1.IConfigClientRequest} message ConfigClientRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigClientRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.item != null && message.hasOwnProperty("item"))
                    $root.dam.v1.Client.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.modification != null && message.hasOwnProperty("modification"))
                    $root.dam.v1.ConfigModification.encode(message.modification, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConfigClientRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigClientRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {dam.v1.IConfigClientRequest} message ConfigClientRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigClientRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConfigClientRequest message from the specified reader or buffer.
             * @function decode
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dam.v1.ConfigClientRequest} ConfigClientRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigClientRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dam.v1.ConfigClientRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.item = $root.dam.v1.Client.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.modification = $root.dam.v1.ConfigModification.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConfigClientRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dam.v1.ConfigClientRequest} ConfigClientRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigClientRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigClientRequest message.
             * @function verify
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigClientRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    var error = $root.dam.v1.Client.verify(message.item);
                    if (error)
                        return "item." + error;
                }
                if (message.modification != null && message.hasOwnProperty("modification")) {
                    var error = $root.dam.v1.ConfigModification.verify(message.modification);
                    if (error)
                        return "modification." + error;
                }
                return null;
            };

            /**
             * Creates a ConfigClientRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dam.v1.ConfigClientRequest} ConfigClientRequest
             */
            ConfigClientRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.dam.v1.ConfigClientRequest)
                    return object;
                var message = new $root.dam.v1.ConfigClientRequest();
                if (object.item != null) {
                    if (typeof object.item !== "object")
                        throw TypeError(".dam.v1.ConfigClientRequest.item: object expected");
                    message.item = $root.dam.v1.Client.fromObject(object.item);
                }
                if (object.modification != null) {
                    if (typeof object.modification !== "object")
                        throw TypeError(".dam.v1.ConfigClientRequest.modification: object expected");
                    message.modification = $root.dam.v1.ConfigModification.fromObject(object.modification);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConfigClientRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dam.v1.ConfigClientRequest
             * @static
             * @param {dam.v1.ConfigClientRequest} message ConfigClientRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigClientRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.item = null;
                    object.modification = null;
                }
                if (message.item != null && message.hasOwnProperty("item"))
                    object.item = $root.dam.v1.Client.toObject(message.item, options);
                if (message.modification != null && message.hasOwnProperty("modification"))
                    object.modification = $root.dam.v1.ConfigModification.toObject(message.modification, options);
                return object;
            };

            /**
             * Converts this ConfigClientRequest to JSON.
             * @function toJSON
             * @memberof dam.v1.ConfigClientRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigClientRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConfigClientRequest;
        })();

        return v1;
    })();

    return dam;
})();

module.exports = $root;
