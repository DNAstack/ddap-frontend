import * as $protobuf from "protobufjs";
/** Namespace dam. */
export namespace dam {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a DamConfig. */
        interface IDamConfig {

            /** DamConfig version */
            version?: (string|null);

            /** DamConfig revision */
            revision?: (number|Long|null);

            /** DamConfig commitTime */
            commitTime?: (number|null);

            /** DamConfig trustedPassportIssuers */
            trustedPassportIssuers?: ({ [k: string]: dam.v1.ITrustedPassportIssuer }|null);

            /** DamConfig trustedSources */
            trustedSources?: ({ [k: string]: dam.v1.ITrustedSource }|null);

            /** DamConfig policies */
            policies?: ({ [k: string]: dam.v1.IPolicy }|null);

            /** DamConfig resources */
            resources?: ({ [k: string]: dam.v1.IResource }|null);

            /** DamConfig clients */
            clients?: ({ [k: string]: dam.v1.IClient }|null);

            /** DamConfig serviceTemplates */
            serviceTemplates?: ({ [k: string]: dam.v1.IServiceTemplate }|null);

            /** DamConfig claimDefinitions */
            claimDefinitions?: ({ [k: string]: dam.v1.IClaimDefinition }|null);

            /** DamConfig testPersonas */
            testPersonas?: ({ [k: string]: dam.v1.ITestPersona }|null);

            /** DamConfig options */
            options?: (dam.v1.IConfigOptions|null);

            /** DamConfig ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a DamConfig. */
        class DamConfig implements IDamConfig {

            /**
             * Constructs a new DamConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IDamConfig);

            /** DamConfig version. */
            public version: string;

            /** DamConfig revision. */
            public revision: (number|Long);

            /** DamConfig commitTime. */
            public commitTime: number;

            /** DamConfig trustedPassportIssuers. */
            public trustedPassportIssuers: { [k: string]: dam.v1.ITrustedPassportIssuer };

            /** DamConfig trustedSources. */
            public trustedSources: { [k: string]: dam.v1.ITrustedSource };

            /** DamConfig policies. */
            public policies: { [k: string]: dam.v1.IPolicy };

            /** DamConfig resources. */
            public resources: { [k: string]: dam.v1.IResource };

            /** DamConfig clients. */
            public clients: { [k: string]: dam.v1.IClient };

            /** DamConfig serviceTemplates. */
            public serviceTemplates: { [k: string]: dam.v1.IServiceTemplate };

            /** DamConfig claimDefinitions. */
            public claimDefinitions: { [k: string]: dam.v1.IClaimDefinition };

            /** DamConfig testPersonas. */
            public testPersonas: { [k: string]: dam.v1.ITestPersona };

            /** DamConfig options. */
            public options?: (dam.v1.IConfigOptions|null);

            /** DamConfig ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new DamConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DamConfig instance
             */
            public static create(properties?: dam.v1.IDamConfig): dam.v1.DamConfig;

            /**
             * Encodes the specified DamConfig message. Does not implicitly {@link dam.v1.DamConfig.verify|verify} messages.
             * @param message DamConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IDamConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DamConfig message, length delimited. Does not implicitly {@link dam.v1.DamConfig.verify|verify} messages.
             * @param message DamConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IDamConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DamConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DamConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.DamConfig;

            /**
             * Decodes a DamConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DamConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.DamConfig;

            /**
             * Verifies a DamConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DamConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DamConfig
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.DamConfig;

            /**
             * Creates a plain object from a DamConfig message. Also converts values to other types if specified.
             * @param message DamConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.DamConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DamConfig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TrustedPassportIssuer. */
        interface ITrustedPassportIssuer {

            /** TrustedPassportIssuer issuer */
            issuer?: (string|null);

            /** TrustedPassportIssuer translateUsing */
            translateUsing?: (string|null);

            /** TrustedPassportIssuer ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a TrustedPassportIssuer. */
        class TrustedPassportIssuer implements ITrustedPassportIssuer {

            /**
             * Constructs a new TrustedPassportIssuer.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ITrustedPassportIssuer);

            /** TrustedPassportIssuer issuer. */
            public issuer: string;

            /** TrustedPassportIssuer translateUsing. */
            public translateUsing: string;

            /** TrustedPassportIssuer ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new TrustedPassportIssuer instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TrustedPassportIssuer instance
             */
            public static create(properties?: dam.v1.ITrustedPassportIssuer): dam.v1.TrustedPassportIssuer;

            /**
             * Encodes the specified TrustedPassportIssuer message. Does not implicitly {@link dam.v1.TrustedPassportIssuer.verify|verify} messages.
             * @param message TrustedPassportIssuer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ITrustedPassportIssuer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TrustedPassportIssuer message, length delimited. Does not implicitly {@link dam.v1.TrustedPassportIssuer.verify|verify} messages.
             * @param message TrustedPassportIssuer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ITrustedPassportIssuer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TrustedPassportIssuer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TrustedPassportIssuer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TrustedPassportIssuer;

            /**
             * Decodes a TrustedPassportIssuer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TrustedPassportIssuer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TrustedPassportIssuer;

            /**
             * Verifies a TrustedPassportIssuer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TrustedPassportIssuer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TrustedPassportIssuer
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.TrustedPassportIssuer;

            /**
             * Creates a plain object from a TrustedPassportIssuer message. Also converts values to other types if specified.
             * @param message TrustedPassportIssuer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.TrustedPassportIssuer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TrustedPassportIssuer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TrustedSource. */
        interface ITrustedSource {

            /** TrustedSource sources */
            sources?: (string[]|null);

            /** TrustedSource claims */
            claims?: (string[]|null);

            /** TrustedSource ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a TrustedSource. */
        class TrustedSource implements ITrustedSource {

            /**
             * Constructs a new TrustedSource.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ITrustedSource);

            /** TrustedSource sources. */
            public sources: string[];

            /** TrustedSource claims. */
            public claims: string[];

            /** TrustedSource ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new TrustedSource instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TrustedSource instance
             */
            public static create(properties?: dam.v1.ITrustedSource): dam.v1.TrustedSource;

            /**
             * Encodes the specified TrustedSource message. Does not implicitly {@link dam.v1.TrustedSource.verify|verify} messages.
             * @param message TrustedSource message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ITrustedSource, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TrustedSource message, length delimited. Does not implicitly {@link dam.v1.TrustedSource.verify|verify} messages.
             * @param message TrustedSource message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ITrustedSource, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TrustedSource message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TrustedSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TrustedSource;

            /**
             * Decodes a TrustedSource message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TrustedSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TrustedSource;

            /**
             * Verifies a TrustedSource message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TrustedSource message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TrustedSource
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.TrustedSource;

            /**
             * Creates a plain object from a TrustedSource message. Also converts values to other types if specified.
             * @param message TrustedSource
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.TrustedSource, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TrustedSource to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Condition. */
        interface ICondition {

            /** Condition claim */
            claim?: (string|null);

            /** Condition dataUse */
            dataUse?: (string|null);

            /** Condition userList */
            userList?: (string|null);

            /** Condition is */
            is?: (string|null);

            /** Condition values */
            values?: (string[]|null);

            /** Condition from */
            from?: (string[]|null);

            /** Condition allTrue */
            allTrue?: (dam.v1.ICondition[]|null);

            /** Condition anyTrue */
            anyTrue?: (dam.v1.ICondition[]|null);
        }

        /** Represents a Condition. */
        class Condition implements ICondition {

            /**
             * Constructs a new Condition.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ICondition);

            /** Condition claim. */
            public claim: string;

            /** Condition dataUse. */
            public dataUse: string;

            /** Condition userList. */
            public userList: string;

            /** Condition is. */
            public is: string;

            /** Condition values. */
            public values: string[];

            /** Condition from. */
            public from: string[];

            /** Condition allTrue. */
            public allTrue: dam.v1.ICondition[];

            /** Condition anyTrue. */
            public anyTrue: dam.v1.ICondition[];

            /** Condition key. */
            public key?: ("claim"|"dataUse"|"userList");

            /**
             * Creates a new Condition instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Condition instance
             */
            public static create(properties?: dam.v1.ICondition): dam.v1.Condition;

            /**
             * Encodes the specified Condition message. Does not implicitly {@link dam.v1.Condition.verify|verify} messages.
             * @param message Condition message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ICondition, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Condition message, length delimited. Does not implicitly {@link dam.v1.Condition.verify|verify} messages.
             * @param message Condition message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ICondition, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Condition message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Condition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.Condition;

            /**
             * Decodes a Condition message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Condition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.Condition;

            /**
             * Verifies a Condition message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Condition message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Condition
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.Condition;

            /**
             * Creates a plain object from a Condition message. Also converts values to other types if specified.
             * @param message Condition
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.Condition, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Condition to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Policy. */
        interface IPolicy {

            /** Policy allow */
            allow?: (dam.v1.ICondition|null);

            /** Policy disallow */
            disallow?: (dam.v1.ICondition|null);

            /** Policy ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a Policy. */
        class Policy implements IPolicy {

            /**
             * Constructs a new Policy.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IPolicy);

            /** Policy allow. */
            public allow?: (dam.v1.ICondition|null);

            /** Policy disallow. */
            public disallow?: (dam.v1.ICondition|null);

            /** Policy ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new Policy instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Policy instance
             */
            public static create(properties?: dam.v1.IPolicy): dam.v1.Policy;

            /**
             * Encodes the specified Policy message. Does not implicitly {@link dam.v1.Policy.verify|verify} messages.
             * @param message Policy message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IPolicy, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Policy message, length delimited. Does not implicitly {@link dam.v1.Policy.verify|verify} messages.
             * @param message Policy message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IPolicy, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Policy message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Policy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.Policy;

            /**
             * Decodes a Policy message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Policy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.Policy;

            /**
             * Verifies a Policy message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Policy message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Policy
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.Policy;

            /**
             * Creates a plain object from a Policy message. Also converts values to other types if specified.
             * @param message Policy
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.Policy, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Policy to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PolicyBasis. */
        interface IPolicyBasis {

            /** PolicyBasis name */
            name?: (string|null);

            /** PolicyBasis type */
            type?: (string|null);

            /** PolicyBasis clauses */
            clauses?: (string[]|null);
        }

        /** Represents a PolicyBasis. */
        class PolicyBasis implements IPolicyBasis {

            /**
             * Constructs a new PolicyBasis.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IPolicyBasis);

            /** PolicyBasis name. */
            public name: string;

            /** PolicyBasis type. */
            public type: string;

            /** PolicyBasis clauses. */
            public clauses: string[];

            /**
             * Creates a new PolicyBasis instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PolicyBasis instance
             */
            public static create(properties?: dam.v1.IPolicyBasis): dam.v1.PolicyBasis;

            /**
             * Encodes the specified PolicyBasis message. Does not implicitly {@link dam.v1.PolicyBasis.verify|verify} messages.
             * @param message PolicyBasis message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IPolicyBasis, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PolicyBasis message, length delimited. Does not implicitly {@link dam.v1.PolicyBasis.verify|verify} messages.
             * @param message PolicyBasis message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IPolicyBasis, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PolicyBasis message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PolicyBasis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.PolicyBasis;

            /**
             * Decodes a PolicyBasis message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PolicyBasis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.PolicyBasis;

            /**
             * Verifies a PolicyBasis message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PolicyBasis message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PolicyBasis
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.PolicyBasis;

            /**
             * Creates a plain object from a PolicyBasis message. Also converts values to other types if specified.
             * @param message PolicyBasis
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.PolicyBasis, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PolicyBasis to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a View. */
        interface IView {

            /** View serviceTemplate */
            serviceTemplate?: (string|null);

            /** View version */
            version?: (string|null);

            /** View topic */
            topic?: (string|null);

            /** View partition */
            partition?: (string|null);

            /** View fidelity */
            fidelity?: (string|null);

            /** View geoLocation */
            geoLocation?: (string|null);

            /** View contentTypes */
            contentTypes?: (string[]|null);

            /** View accessRoles */
            accessRoles?: ({ [k: string]: dam.v1.IAccessRole }|null);

            /** View items */
            items?: (dam.v1.View.IItem[]|null);

            /** View aud */
            aud?: (string|null);

            /** View defaultRole */
            defaultRole?: (string|null);

            /** View ui */
            ui?: ({ [k: string]: string }|null);

            /** View computedInterfaces */
            computedInterfaces?: ({ [k: string]: dam.v1.View.IInterface }|null);
        }

        /** Represents a View. */
        class View implements IView {

            /**
             * Constructs a new View.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IView);

            /** View serviceTemplate. */
            public serviceTemplate: string;

            /** View version. */
            public version: string;

            /** View topic. */
            public topic: string;

            /** View partition. */
            public partition: string;

            /** View fidelity. */
            public fidelity: string;

            /** View geoLocation. */
            public geoLocation: string;

            /** View contentTypes. */
            public contentTypes: string[];

            /** View accessRoles. */
            public accessRoles: { [k: string]: dam.v1.IAccessRole };

            /** View items. */
            public items: dam.v1.View.IItem[];

            /** View aud. */
            public aud: string;

            /** View defaultRole. */
            public defaultRole: string;

            /** View ui. */
            public ui: { [k: string]: string };

            /** View computedInterfaces. */
            public computedInterfaces: { [k: string]: dam.v1.View.IInterface };

            /**
             * Creates a new View instance using the specified properties.
             * @param [properties] Properties to set
             * @returns View instance
             */
            public static create(properties?: dam.v1.IView): dam.v1.View;

            /**
             * Encodes the specified View message. Does not implicitly {@link dam.v1.View.verify|verify} messages.
             * @param message View message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IView, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified View message, length delimited. Does not implicitly {@link dam.v1.View.verify|verify} messages.
             * @param message View message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IView, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a View message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns View
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.View;

            /**
             * Decodes a View message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns View
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.View;

            /**
             * Verifies a View message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a View message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns View
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.View;

            /**
             * Creates a plain object from a View message. Also converts values to other types if specified.
             * @param message View
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.View, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this View to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace View {

            /** Properties of an Interface. */
            interface IInterface {

                /** Interface uri */
                uri?: (string[]|null);
            }

            /** Represents an Interface. */
            class Interface implements IInterface {

                /**
                 * Constructs a new Interface.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.View.IInterface);

                /** Interface uri. */
                public uri: string[];

                /**
                 * Creates a new Interface instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Interface instance
                 */
                public static create(properties?: dam.v1.View.IInterface): dam.v1.View.Interface;

                /**
                 * Encodes the specified Interface message. Does not implicitly {@link dam.v1.View.Interface.verify|verify} messages.
                 * @param message Interface message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.View.IInterface, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Interface message, length delimited. Does not implicitly {@link dam.v1.View.Interface.verify|verify} messages.
                 * @param message Interface message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.View.IInterface, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Interface message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Interface
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.View.Interface;

                /**
                 * Decodes an Interface message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Interface
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.View.Interface;

                /**
                 * Verifies an Interface message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Interface message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Interface
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.View.Interface;

                /**
                 * Creates a plain object from an Interface message. Also converts values to other types if specified.
                 * @param message Interface
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.View.Interface, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Interface to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an Item. */
            interface IItem {

                /** Item vars */
                vars?: ({ [k: string]: string }|null);
            }

            /** Represents an Item. */
            class Item implements IItem {

                /**
                 * Constructs a new Item.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.View.IItem);

                /** Item vars. */
                public vars: { [k: string]: string };

                /**
                 * Creates a new Item instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Item instance
                 */
                public static create(properties?: dam.v1.View.IItem): dam.v1.View.Item;

                /**
                 * Encodes the specified Item message. Does not implicitly {@link dam.v1.View.Item.verify|verify} messages.
                 * @param message Item message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.View.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Item message, length delimited. Does not implicitly {@link dam.v1.View.Item.verify|verify} messages.
                 * @param message Item message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.View.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Item message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Item
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.View.Item;

                /**
                 * Decodes an Item message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Item
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.View.Item;

                /**
                 * Verifies an Item message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Item message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Item
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.View.Item;

                /**
                 * Creates a plain object from an Item message. Also converts values to other types if specified.
                 * @param message Item
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.View.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Item to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a Resource. */
        interface IResource {

            /** Resource umbrella */
            umbrella?: (string|null);

            /** Resource views */
            views?: ({ [k: string]: dam.v1.IView }|null);

            /** Resource clients */
            clients?: (string[]|null);

            /** Resource maxTokenTtl */
            maxTokenTtl?: (string|null);

            /** Resource ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a Resource. */
        class Resource implements IResource {

            /**
             * Constructs a new Resource.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IResource);

            /** Resource umbrella. */
            public umbrella: string;

            /** Resource views. */
            public views: { [k: string]: dam.v1.IView };

            /** Resource clients. */
            public clients: string[];

            /** Resource maxTokenTtl. */
            public maxTokenTtl: string;

            /** Resource ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new Resource instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Resource instance
             */
            public static create(properties?: dam.v1.IResource): dam.v1.Resource;

            /**
             * Encodes the specified Resource message. Does not implicitly {@link dam.v1.Resource.verify|verify} messages.
             * @param message Resource message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IResource, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Resource message, length delimited. Does not implicitly {@link dam.v1.Resource.verify|verify} messages.
             * @param message Resource message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IResource, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Resource message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Resource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.Resource;

            /**
             * Decodes a Resource message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Resource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.Resource;

            /**
             * Verifies a Resource message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Resource message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Resource
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.Resource;

            /**
             * Creates a plain object from a Resource message. Also converts values to other types if specified.
             * @param message Resource
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.Resource, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Resource to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Client. */
        interface IClient {

            /** Client clientId */
            clientId?: (string|null);

            /** Client revision */
            revision?: (number|Long|null);

            /** Client commitTime */
            commitTime?: (number|null);

            /** Client ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a Client. */
        class Client implements IClient {

            /**
             * Constructs a new Client.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IClient);

            /** Client clientId. */
            public clientId: string;

            /** Client revision. */
            public revision: (number|Long);

            /** Client commitTime. */
            public commitTime: number;

            /** Client ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new Client instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Client instance
             */
            public static create(properties?: dam.v1.IClient): dam.v1.Client;

            /**
             * Encodes the specified Client message. Does not implicitly {@link dam.v1.Client.verify|verify} messages.
             * @param message Client message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IClient, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Client message, length delimited. Does not implicitly {@link dam.v1.Client.verify|verify} messages.
             * @param message Client message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IClient, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Client message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Client
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.Client;

            /**
             * Decodes a Client message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Client
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.Client;

            /**
             * Verifies a Client message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Client message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Client
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.Client;

            /**
             * Creates a plain object from a Client message. Also converts values to other types if specified.
             * @param message Client
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.Client, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Client to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceTemplate. */
        interface IServiceTemplate {

            /** ServiceTemplate targetAdapter */
            targetAdapter?: (string|null);

            /** ServiceTemplate itemFormat */
            itemFormat?: (string|null);

            /** ServiceTemplate interfaces */
            interfaces?: ({ [k: string]: string }|null);

            /** ServiceTemplate serviceRoles */
            serviceRoles?: ({ [k: string]: dam.v1.IServiceRole }|null);

            /** ServiceTemplate ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a ServiceTemplate. */
        class ServiceTemplate implements IServiceTemplate {

            /**
             * Constructs a new ServiceTemplate.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IServiceTemplate);

            /** ServiceTemplate targetAdapter. */
            public targetAdapter: string;

            /** ServiceTemplate itemFormat. */
            public itemFormat: string;

            /** ServiceTemplate interfaces. */
            public interfaces: { [k: string]: string };

            /** ServiceTemplate serviceRoles. */
            public serviceRoles: { [k: string]: dam.v1.IServiceRole };

            /** ServiceTemplate ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new ServiceTemplate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceTemplate instance
             */
            public static create(properties?: dam.v1.IServiceTemplate): dam.v1.ServiceTemplate;

            /**
             * Encodes the specified ServiceTemplate message. Does not implicitly {@link dam.v1.ServiceTemplate.verify|verify} messages.
             * @param message ServiceTemplate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IServiceTemplate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceTemplate message, length delimited. Does not implicitly {@link dam.v1.ServiceTemplate.verify|verify} messages.
             * @param message ServiceTemplate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IServiceTemplate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceTemplate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceTemplate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ServiceTemplate;

            /**
             * Decodes a ServiceTemplate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceTemplate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ServiceTemplate;

            /**
             * Verifies a ServiceTemplate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceTemplate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceTemplate
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ServiceTemplate;

            /**
             * Creates a plain object from a ServiceTemplate message. Also converts values to other types if specified.
             * @param message ServiceTemplate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ServiceTemplate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceTemplate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceRole. */
        interface IServiceRole {

            /** ServiceRole targetRoles */
            targetRoles?: (string[]|null);

            /** ServiceRole targetScopes */
            targetScopes?: (string[]|null);

            /** ServiceRole damRoleCategories */
            damRoleCategories?: (string[]|null);

            /** ServiceRole ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a ServiceRole. */
        class ServiceRole implements IServiceRole {

            /**
             * Constructs a new ServiceRole.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IServiceRole);

            /** ServiceRole targetRoles. */
            public targetRoles: string[];

            /** ServiceRole targetScopes. */
            public targetScopes: string[];

            /** ServiceRole damRoleCategories. */
            public damRoleCategories: string[];

            /** ServiceRole ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new ServiceRole instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceRole instance
             */
            public static create(properties?: dam.v1.IServiceRole): dam.v1.ServiceRole;

            /**
             * Encodes the specified ServiceRole message. Does not implicitly {@link dam.v1.ServiceRole.verify|verify} messages.
             * @param message ServiceRole message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IServiceRole, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceRole message, length delimited. Does not implicitly {@link dam.v1.ServiceRole.verify|verify} messages.
             * @param message ServiceRole message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IServiceRole, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceRole message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ServiceRole;

            /**
             * Decodes a ServiceRole message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ServiceRole;

            /**
             * Verifies a ServiceRole message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceRole message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceRole
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ServiceRole;

            /**
             * Creates a plain object from a ServiceRole message. Also converts values to other types if specified.
             * @param message ServiceRole
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ServiceRole, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceRole to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AccessRole. */
        interface IAccessRole {

            /** AccessRole policies */
            policies?: (string[]|null);

            /** AccessRole ui */
            ui?: ({ [k: string]: string }|null);

            /** AccessRole computedPolicyBasis */
            computedPolicyBasis?: (dam.v1.IPolicyBasis[]|null);
        }

        /** Represents an AccessRole. */
        class AccessRole implements IAccessRole {

            /**
             * Constructs a new AccessRole.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IAccessRole);

            /** AccessRole policies. */
            public policies: string[];

            /** AccessRole ui. */
            public ui: { [k: string]: string };

            /** AccessRole computedPolicyBasis. */
            public computedPolicyBasis: dam.v1.IPolicyBasis[];

            /**
             * Creates a new AccessRole instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AccessRole instance
             */
            public static create(properties?: dam.v1.IAccessRole): dam.v1.AccessRole;

            /**
             * Encodes the specified AccessRole message. Does not implicitly {@link dam.v1.AccessRole.verify|verify} messages.
             * @param message AccessRole message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IAccessRole, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AccessRole message, length delimited. Does not implicitly {@link dam.v1.AccessRole.verify|verify} messages.
             * @param message AccessRole message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IAccessRole, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AccessRole message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AccessRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.AccessRole;

            /**
             * Decodes an AccessRole message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AccessRole
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.AccessRole;

            /**
             * Verifies an AccessRole message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AccessRole message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AccessRole
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.AccessRole;

            /**
             * Creates a plain object from an AccessRole message. Also converts values to other types if specified.
             * @param message AccessRole
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.AccessRole, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AccessRole to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigOptions. */
        interface IConfigOptions {

            /** ConfigOptions readOnlyMasterRealm */
            readOnlyMasterRealm?: (boolean|null);

            /** ConfigOptions whitelistedRealms */
            whitelistedRealms?: (string[]|null);

            /** ConfigOptions gcpManagedKeysMaxRequestedTtl */
            gcpManagedKeysMaxRequestedTtl?: (string|null);

            /** ConfigOptions gcpManagedKeysPerAccount */
            gcpManagedKeysPerAccount?: (number|null);

            /** ConfigOptions gcpServiceAccountProject */
            gcpServiceAccountProject?: (string|null);

            /** ConfigOptions computedDescriptors */
            computedDescriptors?: ({ [k: string]: dam.v1.ConfigOptions.IDescriptor }|null);
        }

        /** Represents a ConfigOptions. */
        class ConfigOptions implements IConfigOptions {

            /**
             * Constructs a new ConfigOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigOptions);

            /** ConfigOptions readOnlyMasterRealm. */
            public readOnlyMasterRealm: boolean;

            /** ConfigOptions whitelistedRealms. */
            public whitelistedRealms: string[];

            /** ConfigOptions gcpManagedKeysMaxRequestedTtl. */
            public gcpManagedKeysMaxRequestedTtl: string;

            /** ConfigOptions gcpManagedKeysPerAccount. */
            public gcpManagedKeysPerAccount: number;

            /** ConfigOptions gcpServiceAccountProject. */
            public gcpServiceAccountProject: string;

            /** ConfigOptions computedDescriptors. */
            public computedDescriptors: { [k: string]: dam.v1.ConfigOptions.IDescriptor };

            /**
             * Creates a new ConfigOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigOptions instance
             */
            public static create(properties?: dam.v1.IConfigOptions): dam.v1.ConfigOptions;

            /**
             * Encodes the specified ConfigOptions message. Does not implicitly {@link dam.v1.ConfigOptions.verify|verify} messages.
             * @param message ConfigOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigOptions message, length delimited. Does not implicitly {@link dam.v1.ConfigOptions.verify|verify} messages.
             * @param message ConfigOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigOptions;

            /**
             * Decodes a ConfigOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigOptions;

            /**
             * Verifies a ConfigOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigOptions
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigOptions;

            /**
             * Creates a plain object from a ConfigOptions message. Also converts values to other types if specified.
             * @param message ConfigOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ConfigOptions {

            /** Properties of a Descriptor. */
            interface IDescriptor {

                /** Descriptor label */
                label?: (string|null);

                /** Descriptor description */
                description?: (string|null);

                /** Descriptor regexp */
                regexp?: (string|null);

                /** Descriptor type */
                type?: (string|null);

                /** Descriptor isList */
                isList?: (boolean|null);

                /** Descriptor enumValues */
                enumValues?: (string[]|null);

                /** Descriptor min */
                min?: (string|null);

                /** Descriptor max */
                max?: (string|null);

                /** Descriptor defaultValue */
                defaultValue?: (string|null);
            }

            /** Represents a Descriptor. */
            class Descriptor implements IDescriptor {

                /**
                 * Constructs a new Descriptor.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.ConfigOptions.IDescriptor);

                /** Descriptor label. */
                public label: string;

                /** Descriptor description. */
                public description: string;

                /** Descriptor regexp. */
                public regexp: string;

                /** Descriptor type. */
                public type: string;

                /** Descriptor isList. */
                public isList: boolean;

                /** Descriptor enumValues. */
                public enumValues: string[];

                /** Descriptor min. */
                public min: string;

                /** Descriptor max. */
                public max: string;

                /** Descriptor defaultValue. */
                public defaultValue: string;

                /**
                 * Creates a new Descriptor instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Descriptor instance
                 */
                public static create(properties?: dam.v1.ConfigOptions.IDescriptor): dam.v1.ConfigOptions.Descriptor;

                /**
                 * Encodes the specified Descriptor message. Does not implicitly {@link dam.v1.ConfigOptions.Descriptor.verify|verify} messages.
                 * @param message Descriptor message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.ConfigOptions.IDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Descriptor message, length delimited. Does not implicitly {@link dam.v1.ConfigOptions.Descriptor.verify|verify} messages.
                 * @param message Descriptor message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.ConfigOptions.IDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Descriptor message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Descriptor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigOptions.Descriptor;

                /**
                 * Decodes a Descriptor message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Descriptor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigOptions.Descriptor;

                /**
                 * Verifies a Descriptor message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Descriptor message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Descriptor
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.ConfigOptions.Descriptor;

                /**
                 * Creates a plain object from a Descriptor message. Also converts values to other types if specified.
                 * @param message Descriptor
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.ConfigOptions.Descriptor, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Descriptor to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a ClaimDefinition. */
        interface IClaimDefinition {

            /** ClaimDefinition ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a ClaimDefinition. */
        class ClaimDefinition implements IClaimDefinition {

            /**
             * Constructs a new ClaimDefinition.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IClaimDefinition);

            /** ClaimDefinition ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new ClaimDefinition instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClaimDefinition instance
             */
            public static create(properties?: dam.v1.IClaimDefinition): dam.v1.ClaimDefinition;

            /**
             * Encodes the specified ClaimDefinition message. Does not implicitly {@link dam.v1.ClaimDefinition.verify|verify} messages.
             * @param message ClaimDefinition message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IClaimDefinition, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClaimDefinition message, length delimited. Does not implicitly {@link dam.v1.ClaimDefinition.verify|verify} messages.
             * @param message ClaimDefinition message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IClaimDefinition, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClaimDefinition message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClaimDefinition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ClaimDefinition;

            /**
             * Decodes a ClaimDefinition message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClaimDefinition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ClaimDefinition;

            /**
             * Verifies a ClaimDefinition message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClaimDefinition message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClaimDefinition
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ClaimDefinition;

            /**
             * Creates a plain object from a ClaimDefinition message. Also converts values to other types if specified.
             * @param message ClaimDefinition
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ClaimDefinition, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClaimDefinition to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AccessList. */
        interface IAccessList {

            /** AccessList access */
            access?: (string[]|null);
        }

        /** Represents an AccessList. */
        class AccessList implements IAccessList {

            /**
             * Constructs a new AccessList.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IAccessList);

            /** AccessList access. */
            public access: string[];

            /**
             * Creates a new AccessList instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AccessList instance
             */
            public static create(properties?: dam.v1.IAccessList): dam.v1.AccessList;

            /**
             * Encodes the specified AccessList message. Does not implicitly {@link dam.v1.AccessList.verify|verify} messages.
             * @param message AccessList message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IAccessList, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AccessList message, length delimited. Does not implicitly {@link dam.v1.AccessList.verify|verify} messages.
             * @param message AccessList message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IAccessList, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AccessList message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AccessList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.AccessList;

            /**
             * Decodes an AccessList message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AccessList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.AccessList;

            /**
             * Verifies an AccessList message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AccessList message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AccessList
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.AccessList;

            /**
             * Creates a plain object from an AccessList message. Also converts values to other types if specified.
             * @param message AccessList
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.AccessList, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AccessList to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TestPersona. */
        interface ITestPersona {

            /** TestPersona idToken */
            idToken?: (dam.v1.TestPersona.ITestIdentityToken|null);

            /** TestPersona resources */
            resources?: ({ [k: string]: dam.v1.IAccessList }|null);

            /** TestPersona ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a TestPersona. */
        class TestPersona implements ITestPersona {

            /**
             * Constructs a new TestPersona.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ITestPersona);

            /** TestPersona idToken. */
            public idToken?: (dam.v1.TestPersona.ITestIdentityToken|null);

            /** TestPersona resources. */
            public resources: { [k: string]: dam.v1.IAccessList };

            /** TestPersona ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new TestPersona instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TestPersona instance
             */
            public static create(properties?: dam.v1.ITestPersona): dam.v1.TestPersona;

            /**
             * Encodes the specified TestPersona message. Does not implicitly {@link dam.v1.TestPersona.verify|verify} messages.
             * @param message TestPersona message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ITestPersona, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TestPersona message, length delimited. Does not implicitly {@link dam.v1.TestPersona.verify|verify} messages.
             * @param message TestPersona message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ITestPersona, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TestPersona message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TestPersona
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TestPersona;

            /**
             * Decodes a TestPersona message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TestPersona
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TestPersona;

            /**
             * Verifies a TestPersona message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TestPersona message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TestPersona
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.TestPersona;

            /**
             * Creates a plain object from a TestPersona message. Also converts values to other types if specified.
             * @param message TestPersona
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.TestPersona, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TestPersona to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace TestPersona {

            /** Properties of a GA4GHClaim. */
            interface IGA4GHClaim {

                /** GA4GHClaim claimName */
                claimName?: (string|null);

                /** GA4GHClaim source */
                source?: (string|null);

                /** GA4GHClaim value */
                value?: (string|null);

                /** GA4GHClaim iat */
                iat?: (number|null);

                /** GA4GHClaim exp */
                exp?: (number|null);

                /** GA4GHClaim scope */
                scope?: (string|null);

                /** GA4GHClaim by */
                by?: (string|null);
            }

            /** Represents a GA4GHClaim. */
            class GA4GHClaim implements IGA4GHClaim {

                /**
                 * Constructs a new GA4GHClaim.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.TestPersona.IGA4GHClaim);

                /** GA4GHClaim claimName. */
                public claimName: string;

                /** GA4GHClaim source. */
                public source: string;

                /** GA4GHClaim value. */
                public value: string;

                /** GA4GHClaim iat. */
                public iat: number;

                /** GA4GHClaim exp. */
                public exp: number;

                /** GA4GHClaim scope. */
                public scope: string;

                /** GA4GHClaim by. */
                public by: string;

                /**
                 * Creates a new GA4GHClaim instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GA4GHClaim instance
                 */
                public static create(properties?: dam.v1.TestPersona.IGA4GHClaim): dam.v1.TestPersona.GA4GHClaim;

                /**
                 * Encodes the specified GA4GHClaim message. Does not implicitly {@link dam.v1.TestPersona.GA4GHClaim.verify|verify} messages.
                 * @param message GA4GHClaim message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.TestPersona.IGA4GHClaim, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GA4GHClaim message, length delimited. Does not implicitly {@link dam.v1.TestPersona.GA4GHClaim.verify|verify} messages.
                 * @param message GA4GHClaim message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.TestPersona.IGA4GHClaim, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GA4GHClaim message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GA4GHClaim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TestPersona.GA4GHClaim;

                /**
                 * Decodes a GA4GHClaim message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GA4GHClaim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TestPersona.GA4GHClaim;

                /**
                 * Verifies a GA4GHClaim message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GA4GHClaim message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GA4GHClaim
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.TestPersona.GA4GHClaim;

                /**
                 * Creates a plain object from a GA4GHClaim message. Also converts values to other types if specified.
                 * @param message GA4GHClaim
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.TestPersona.GA4GHClaim, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GA4GHClaim to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestIdentityToken. */
            interface ITestIdentityToken {

                /** TestIdentityToken standardClaims */
                standardClaims?: ({ [k: string]: string }|null);

                /** TestIdentityToken ga4ghClaims */
                ga4ghClaims?: (dam.v1.TestPersona.IGA4GHClaim[]|null);
            }

            /** Represents a TestIdentityToken. */
            class TestIdentityToken implements ITestIdentityToken {

                /**
                 * Constructs a new TestIdentityToken.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.TestPersona.ITestIdentityToken);

                /** TestIdentityToken standardClaims. */
                public standardClaims: { [k: string]: string };

                /** TestIdentityToken ga4ghClaims. */
                public ga4ghClaims: dam.v1.TestPersona.IGA4GHClaim[];

                /**
                 * Creates a new TestIdentityToken instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestIdentityToken instance
                 */
                public static create(properties?: dam.v1.TestPersona.ITestIdentityToken): dam.v1.TestPersona.TestIdentityToken;

                /**
                 * Encodes the specified TestIdentityToken message. Does not implicitly {@link dam.v1.TestPersona.TestIdentityToken.verify|verify} messages.
                 * @param message TestIdentityToken message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.TestPersona.ITestIdentityToken, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestIdentityToken message, length delimited. Does not implicitly {@link dam.v1.TestPersona.TestIdentityToken.verify|verify} messages.
                 * @param message TestIdentityToken message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.TestPersona.ITestIdentityToken, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestIdentityToken message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestIdentityToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TestPersona.TestIdentityToken;

                /**
                 * Decodes a TestIdentityToken message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestIdentityToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TestPersona.TestIdentityToken;

                /**
                 * Verifies a TestIdentityToken message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestIdentityToken message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestIdentityToken
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.TestPersona.TestIdentityToken;

                /**
                 * Creates a plain object from a TestIdentityToken message. Also converts values to other types if specified.
                 * @param message TestIdentityToken
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.TestPersona.TestIdentityToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestIdentityToken to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a HistoryEntry. */
        interface IHistoryEntry {

            /** HistoryEntry revision */
            revision?: (number|Long|null);

            /** HistoryEntry user */
            user?: (string|null);

            /** HistoryEntry commitTime */
            commitTime?: (number|null);

            /** HistoryEntry path */
            path?: (string|null);

            /** HistoryEntry query */
            query?: (string|null);

            /** HistoryEntry desc */
            desc?: (string|null);

            /** HistoryEntry method */
            method?: (string|null);

            /** HistoryEntry changeType */
            changeType?: (string|null);

            /** HistoryEntry originalValue */
            originalValue?: (string|null);

            /** HistoryEntry changeRequest */
            changeRequest?: (string|null);
        }

        /** Represents a HistoryEntry. */
        class HistoryEntry implements IHistoryEntry {

            /**
             * Constructs a new HistoryEntry.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IHistoryEntry);

            /** HistoryEntry revision. */
            public revision: (number|Long);

            /** HistoryEntry user. */
            public user: string;

            /** HistoryEntry commitTime. */
            public commitTime: number;

            /** HistoryEntry path. */
            public path: string;

            /** HistoryEntry query. */
            public query: string;

            /** HistoryEntry desc. */
            public desc: string;

            /** HistoryEntry method. */
            public method: string;

            /** HistoryEntry changeType. */
            public changeType: string;

            /** HistoryEntry originalValue. */
            public originalValue: string;

            /** HistoryEntry changeRequest. */
            public changeRequest: string;

            /**
             * Creates a new HistoryEntry instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HistoryEntry instance
             */
            public static create(properties?: dam.v1.IHistoryEntry): dam.v1.HistoryEntry;

            /**
             * Encodes the specified HistoryEntry message. Does not implicitly {@link dam.v1.HistoryEntry.verify|verify} messages.
             * @param message HistoryEntry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IHistoryEntry, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HistoryEntry message, length delimited. Does not implicitly {@link dam.v1.HistoryEntry.verify|verify} messages.
             * @param message HistoryEntry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IHistoryEntry, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HistoryEntry message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HistoryEntry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.HistoryEntry;

            /**
             * Decodes a HistoryEntry message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HistoryEntry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.HistoryEntry;

            /**
             * Verifies a HistoryEntry message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HistoryEntry message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HistoryEntry
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.HistoryEntry;

            /**
             * Creates a plain object from a HistoryEntry message. Also converts values to other types if specified.
             * @param message HistoryEntry
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.HistoryEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HistoryEntry to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a History. */
        interface IHistory {

            /** History history */
            history?: (dam.v1.IHistoryEntry[]|null);

            /** History nextPageToken */
            nextPageToken?: (string|null);
        }

        /** Represents a History. */
        class History implements IHistory {

            /**
             * Constructs a new History.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IHistory);

            /** History history. */
            public history: dam.v1.IHistoryEntry[];

            /** History nextPageToken. */
            public nextPageToken: string;

            /**
             * Creates a new History instance using the specified properties.
             * @param [properties] Properties to set
             * @returns History instance
             */
            public static create(properties?: dam.v1.IHistory): dam.v1.History;

            /**
             * Encodes the specified History message. Does not implicitly {@link dam.v1.History.verify|verify} messages.
             * @param message History message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IHistory, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified History message, length delimited. Does not implicitly {@link dam.v1.History.verify|verify} messages.
             * @param message History message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IHistory, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a History message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns History
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.History;

            /**
             * Decodes a History message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns History
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.History;

            /**
             * Verifies a History message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a History message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns History
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.History;

            /**
             * Creates a plain object from a History message. Also converts values to other types if specified.
             * @param message History
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.History, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this History to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TargetAdapter. */
        interface ITargetAdapter {

            /** TargetAdapter platform */
            platform?: (string|null);

            /** TargetAdapter requirements */
            requirements?: (dam.v1.TargetAdapter.IRequirements|null);

            /** TargetAdapter properties */
            properties?: (dam.v1.TargetAdapter.IProperties|null);

            /** TargetAdapter itemFormats */
            itemFormats?: ({ [k: string]: dam.v1.IItemFormat }|null);

            /** TargetAdapter ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a TargetAdapter. */
        class TargetAdapter implements ITargetAdapter {

            /**
             * Constructs a new TargetAdapter.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ITargetAdapter);

            /** TargetAdapter platform. */
            public platform: string;

            /** TargetAdapter requirements. */
            public requirements?: (dam.v1.TargetAdapter.IRequirements|null);

            /** TargetAdapter properties. */
            public properties?: (dam.v1.TargetAdapter.IProperties|null);

            /** TargetAdapter itemFormats. */
            public itemFormats: { [k: string]: dam.v1.IItemFormat };

            /** TargetAdapter ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new TargetAdapter instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TargetAdapter instance
             */
            public static create(properties?: dam.v1.ITargetAdapter): dam.v1.TargetAdapter;

            /**
             * Encodes the specified TargetAdapter message. Does not implicitly {@link dam.v1.TargetAdapter.verify|verify} messages.
             * @param message TargetAdapter message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ITargetAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TargetAdapter message, length delimited. Does not implicitly {@link dam.v1.TargetAdapter.verify|verify} messages.
             * @param message TargetAdapter message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ITargetAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TargetAdapter message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TargetAdapter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TargetAdapter;

            /**
             * Decodes a TargetAdapter message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TargetAdapter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TargetAdapter;

            /**
             * Verifies a TargetAdapter message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TargetAdapter message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TargetAdapter
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.TargetAdapter;

            /**
             * Creates a plain object from a TargetAdapter message. Also converts values to other types if specified.
             * @param message TargetAdapter
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.TargetAdapter, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TargetAdapter to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace TargetAdapter {

            /** Properties of a Requirements. */
            interface IRequirements {

                /** Requirements targetRole */
                targetRole?: (boolean|null);

                /** Requirements targetScope */
                targetScope?: (boolean|null);

                /** Requirements aud */
                aud?: (boolean|null);
            }

            /** Represents a Requirements. */
            class Requirements implements IRequirements {

                /**
                 * Constructs a new Requirements.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.TargetAdapter.IRequirements);

                /** Requirements targetRole. */
                public targetRole: boolean;

                /** Requirements targetScope. */
                public targetScope: boolean;

                /** Requirements aud. */
                public aud: boolean;

                /**
                 * Creates a new Requirements instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Requirements instance
                 */
                public static create(properties?: dam.v1.TargetAdapter.IRequirements): dam.v1.TargetAdapter.Requirements;

                /**
                 * Encodes the specified Requirements message. Does not implicitly {@link dam.v1.TargetAdapter.Requirements.verify|verify} messages.
                 * @param message Requirements message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.TargetAdapter.IRequirements, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Requirements message, length delimited. Does not implicitly {@link dam.v1.TargetAdapter.Requirements.verify|verify} messages.
                 * @param message Requirements message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.TargetAdapter.IRequirements, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Requirements message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Requirements
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TargetAdapter.Requirements;

                /**
                 * Decodes a Requirements message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Requirements
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TargetAdapter.Requirements;

                /**
                 * Verifies a Requirements message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Requirements message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Requirements
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.TargetAdapter.Requirements;

                /**
                 * Creates a plain object from a Requirements message. Also converts values to other types if specified.
                 * @param message Requirements
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.TargetAdapter.Requirements, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Requirements to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Properties. */
            interface IProperties {

                /** Properties isAggregate */
                isAggregate?: (boolean|null);

                /** Properties canBeAggregated */
                canBeAggregated?: (boolean|null);

                /** Properties singleItem */
                singleItem?: (boolean|null);
            }

            /** Represents a Properties. */
            class Properties implements IProperties {

                /**
                 * Constructs a new Properties.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.TargetAdapter.IProperties);

                /** Properties isAggregate. */
                public isAggregate: boolean;

                /** Properties canBeAggregated. */
                public canBeAggregated: boolean;

                /** Properties singleItem. */
                public singleItem: boolean;

                /**
                 * Creates a new Properties instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Properties instance
                 */
                public static create(properties?: dam.v1.TargetAdapter.IProperties): dam.v1.TargetAdapter.Properties;

                /**
                 * Encodes the specified Properties message. Does not implicitly {@link dam.v1.TargetAdapter.Properties.verify|verify} messages.
                 * @param message Properties message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.TargetAdapter.IProperties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Properties message, length delimited. Does not implicitly {@link dam.v1.TargetAdapter.Properties.verify|verify} messages.
                 * @param message Properties message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.TargetAdapter.IProperties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Properties message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Properties
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TargetAdapter.Properties;

                /**
                 * Decodes a Properties message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Properties
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TargetAdapter.Properties;

                /**
                 * Verifies a Properties message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Properties message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Properties
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.TargetAdapter.Properties;

                /**
                 * Creates a plain object from a Properties message. Also converts values to other types if specified.
                 * @param message Properties
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.TargetAdapter.Properties, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Properties to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of an ItemFormat. */
        interface IItemFormat {

            /** ItemFormat variables */
            variables?: ({ [k: string]: dam.v1.IVariableFormat }|null);

            /** ItemFormat ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents an ItemFormat. */
        class ItemFormat implements IItemFormat {

            /**
             * Constructs a new ItemFormat.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IItemFormat);

            /** ItemFormat variables. */
            public variables: { [k: string]: dam.v1.IVariableFormat };

            /** ItemFormat ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new ItemFormat instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ItemFormat instance
             */
            public static create(properties?: dam.v1.IItemFormat): dam.v1.ItemFormat;

            /**
             * Encodes the specified ItemFormat message. Does not implicitly {@link dam.v1.ItemFormat.verify|verify} messages.
             * @param message ItemFormat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IItemFormat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ItemFormat message, length delimited. Does not implicitly {@link dam.v1.ItemFormat.verify|verify} messages.
             * @param message ItemFormat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IItemFormat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ItemFormat message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ItemFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ItemFormat;

            /**
             * Decodes an ItemFormat message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ItemFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ItemFormat;

            /**
             * Verifies an ItemFormat message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ItemFormat message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ItemFormat
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ItemFormat;

            /**
             * Creates a plain object from an ItemFormat message. Also converts values to other types if specified.
             * @param message ItemFormat
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ItemFormat, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ItemFormat to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VariableFormat. */
        interface IVariableFormat {

            /** VariableFormat regexp */
            regexp?: (string|null);

            /** VariableFormat optional */
            optional?: (boolean|null);

            /** VariableFormat ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a VariableFormat. */
        class VariableFormat implements IVariableFormat {

            /**
             * Constructs a new VariableFormat.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IVariableFormat);

            /** VariableFormat regexp. */
            public regexp: string;

            /** VariableFormat optional. */
            public optional: boolean;

            /** VariableFormat ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new VariableFormat instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VariableFormat instance
             */
            public static create(properties?: dam.v1.IVariableFormat): dam.v1.VariableFormat;

            /**
             * Encodes the specified VariableFormat message. Does not implicitly {@link dam.v1.VariableFormat.verify|verify} messages.
             * @param message VariableFormat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IVariableFormat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VariableFormat message, length delimited. Does not implicitly {@link dam.v1.VariableFormat.verify|verify} messages.
             * @param message VariableFormat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IVariableFormat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VariableFormat message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VariableFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.VariableFormat;

            /**
             * Decodes a VariableFormat message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VariableFormat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.VariableFormat;

            /**
             * Verifies a VariableFormat message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VariableFormat message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VariableFormat
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.VariableFormat;

            /**
             * Creates a plain object from a VariableFormat message. Also converts values to other types if specified.
             * @param message VariableFormat
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.VariableFormat, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VariableFormat to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Realm. */
        interface IRealm {
        }

        /** Represents a Realm. */
        class Realm implements IRealm {

            /**
             * Constructs a new Realm.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IRealm);

            /**
             * Creates a new Realm instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Realm instance
             */
            public static create(properties?: dam.v1.IRealm): dam.v1.Realm;

            /**
             * Encodes the specified Realm message. Does not implicitly {@link dam.v1.Realm.verify|verify} messages.
             * @param message Realm message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IRealm, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Realm message, length delimited. Does not implicitly {@link dam.v1.Realm.verify|verify} messages.
             * @param message Realm message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IRealm, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Realm message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Realm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.Realm;

            /**
             * Decodes a Realm message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Realm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.Realm;

            /**
             * Verifies a Realm message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Realm message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Realm
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.Realm;

            /**
             * Creates a plain object from a Realm message. Also converts values to other types if specified.
             * @param message Realm
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.Realm, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Realm to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PassportTranslator. */
        interface IPassportTranslator {

            /** PassportTranslator compatibleIssuers */
            compatibleIssuers?: (string[]|null);

            /** PassportTranslator ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a PassportTranslator. */
        class PassportTranslator implements IPassportTranslator {

            /**
             * Constructs a new PassportTranslator.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IPassportTranslator);

            /** PassportTranslator compatibleIssuers. */
            public compatibleIssuers: string[];

            /** PassportTranslator ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new PassportTranslator instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PassportTranslator instance
             */
            public static create(properties?: dam.v1.IPassportTranslator): dam.v1.PassportTranslator;

            /**
             * Encodes the specified PassportTranslator message. Does not implicitly {@link dam.v1.PassportTranslator.verify|verify} messages.
             * @param message PassportTranslator message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IPassportTranslator, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PassportTranslator message, length delimited. Does not implicitly {@link dam.v1.PassportTranslator.verify|verify} messages.
             * @param message PassportTranslator message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IPassportTranslator, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PassportTranslator message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PassportTranslator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.PassportTranslator;

            /**
             * Decodes a PassportTranslator message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PassportTranslator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.PassportTranslator;

            /**
             * Verifies a PassportTranslator message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PassportTranslator message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PassportTranslator
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.PassportTranslator;

            /**
             * Creates a plain object from a PassportTranslator message. Also converts values to other types if specified.
             * @param message PassportTranslator
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.PassportTranslator, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PassportTranslator to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetInfoRequest. */
        interface IGetInfoRequest {
        }

        /** Represents a GetInfoRequest. */
        class GetInfoRequest implements IGetInfoRequest {

            /**
             * Constructs a new GetInfoRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetInfoRequest);

            /**
             * Creates a new GetInfoRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetInfoRequest instance
             */
            public static create(properties?: dam.v1.IGetInfoRequest): dam.v1.GetInfoRequest;

            /**
             * Encodes the specified GetInfoRequest message. Does not implicitly {@link dam.v1.GetInfoRequest.verify|verify} messages.
             * @param message GetInfoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetInfoRequest message, length delimited. Does not implicitly {@link dam.v1.GetInfoRequest.verify|verify} messages.
             * @param message GetInfoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetInfoRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetInfoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetInfoRequest;

            /**
             * Decodes a GetInfoRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetInfoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetInfoRequest;

            /**
             * Verifies a GetInfoRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetInfoRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetInfoRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetInfoRequest;

            /**
             * Creates a plain object from a GetInfoRequest message. Also converts values to other types if specified.
             * @param message GetInfoRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetInfoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetInfoRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetInfoResponse. */
        interface IGetInfoResponse {

            /** GetInfoResponse name */
            name?: (string|null);

            /** GetInfoResponse versions */
            versions?: (string[]|null);

            /** GetInfoResponse startTime */
            startTime?: (number|Long|null);
        }

        /** Represents a GetInfoResponse. */
        class GetInfoResponse implements IGetInfoResponse {

            /**
             * Constructs a new GetInfoResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetInfoResponse);

            /** GetInfoResponse name. */
            public name: string;

            /** GetInfoResponse versions. */
            public versions: string[];

            /** GetInfoResponse startTime. */
            public startTime: (number|Long);

            /**
             * Creates a new GetInfoResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetInfoResponse instance
             */
            public static create(properties?: dam.v1.IGetInfoResponse): dam.v1.GetInfoResponse;

            /**
             * Encodes the specified GetInfoResponse message. Does not implicitly {@link dam.v1.GetInfoResponse.verify|verify} messages.
             * @param message GetInfoResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetInfoResponse message, length delimited. Does not implicitly {@link dam.v1.GetInfoResponse.verify|verify} messages.
             * @param message GetInfoResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetInfoResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetInfoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetInfoResponse;

            /**
             * Decodes a GetInfoResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetInfoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetInfoResponse;

            /**
             * Verifies a GetInfoResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetInfoResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetInfoResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetInfoResponse;

            /**
             * Creates a plain object from a GetInfoResponse message. Also converts values to other types if specified.
             * @param message GetInfoResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetInfoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetInfoResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RealmRequest. */
        interface IRealmRequest {

            /** RealmRequest item */
            item?: (dam.v1.IRealm|null);
        }

        /** Represents a RealmRequest. */
        class RealmRequest implements IRealmRequest {

            /**
             * Constructs a new RealmRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IRealmRequest);

            /** RealmRequest item. */
            public item?: (dam.v1.IRealm|null);

            /**
             * Creates a new RealmRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RealmRequest instance
             */
            public static create(properties?: dam.v1.IRealmRequest): dam.v1.RealmRequest;

            /**
             * Encodes the specified RealmRequest message. Does not implicitly {@link dam.v1.RealmRequest.verify|verify} messages.
             * @param message RealmRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IRealmRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RealmRequest message, length delimited. Does not implicitly {@link dam.v1.RealmRequest.verify|verify} messages.
             * @param message RealmRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IRealmRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RealmRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RealmRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.RealmRequest;

            /**
             * Decodes a RealmRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RealmRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.RealmRequest;

            /**
             * Verifies a RealmRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RealmRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RealmRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.RealmRequest;

            /**
             * Creates a plain object from a RealmRequest message. Also converts values to other types if specified.
             * @param message RealmRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.RealmRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RealmRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RealmResponse. */
        interface IRealmResponse {
        }

        /** Represents a RealmResponse. */
        class RealmResponse implements IRealmResponse {

            /**
             * Constructs a new RealmResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IRealmResponse);

            /**
             * Creates a new RealmResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RealmResponse instance
             */
            public static create(properties?: dam.v1.IRealmResponse): dam.v1.RealmResponse;

            /**
             * Encodes the specified RealmResponse message. Does not implicitly {@link dam.v1.RealmResponse.verify|verify} messages.
             * @param message RealmResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IRealmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RealmResponse message, length delimited. Does not implicitly {@link dam.v1.RealmResponse.verify|verify} messages.
             * @param message RealmResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IRealmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RealmResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RealmResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.RealmResponse;

            /**
             * Decodes a RealmResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RealmResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.RealmResponse;

            /**
             * Verifies a RealmResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RealmResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RealmResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.RealmResponse;

            /**
             * Creates a plain object from a RealmResponse message. Also converts values to other types if specified.
             * @param message RealmResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.RealmResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RealmResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetResourcesRequest. */
        interface IGetResourcesRequest {

            /** GetResourcesRequest filter */
            filter?: (string|null);

            /** GetResourcesRequest include */
            include?: (string|null);
        }

        /** Represents a GetResourcesRequest. */
        class GetResourcesRequest implements IGetResourcesRequest {

            /**
             * Constructs a new GetResourcesRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetResourcesRequest);

            /** GetResourcesRequest filter. */
            public filter: string;

            /** GetResourcesRequest include. */
            public include: string;

            /**
             * Creates a new GetResourcesRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetResourcesRequest instance
             */
            public static create(properties?: dam.v1.IGetResourcesRequest): dam.v1.GetResourcesRequest;

            /**
             * Encodes the specified GetResourcesRequest message. Does not implicitly {@link dam.v1.GetResourcesRequest.verify|verify} messages.
             * @param message GetResourcesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetResourcesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetResourcesRequest message, length delimited. Does not implicitly {@link dam.v1.GetResourcesRequest.verify|verify} messages.
             * @param message GetResourcesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetResourcesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetResourcesRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetResourcesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetResourcesRequest;

            /**
             * Decodes a GetResourcesRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetResourcesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetResourcesRequest;

            /**
             * Verifies a GetResourcesRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetResourcesRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetResourcesRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetResourcesRequest;

            /**
             * Creates a plain object from a GetResourcesRequest message. Also converts values to other types if specified.
             * @param message GetResourcesRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetResourcesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetResourcesRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetResourcesResponse. */
        interface IGetResourcesResponse {

            /** GetResourcesResponse resources */
            resources?: ({ [k: string]: dam.v1.IResource }|null);
        }

        /** Represents a GetResourcesResponse. */
        class GetResourcesResponse implements IGetResourcesResponse {

            /**
             * Constructs a new GetResourcesResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetResourcesResponse);

            /** GetResourcesResponse resources. */
            public resources: { [k: string]: dam.v1.IResource };

            /**
             * Creates a new GetResourcesResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetResourcesResponse instance
             */
            public static create(properties?: dam.v1.IGetResourcesResponse): dam.v1.GetResourcesResponse;

            /**
             * Encodes the specified GetResourcesResponse message. Does not implicitly {@link dam.v1.GetResourcesResponse.verify|verify} messages.
             * @param message GetResourcesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetResourcesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetResourcesResponse message, length delimited. Does not implicitly {@link dam.v1.GetResourcesResponse.verify|verify} messages.
             * @param message GetResourcesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetResourcesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetResourcesResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetResourcesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetResourcesResponse;

            /**
             * Decodes a GetResourcesResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetResourcesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetResourcesResponse;

            /**
             * Verifies a GetResourcesResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetResourcesResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetResourcesResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetResourcesResponse;

            /**
             * Creates a plain object from a GetResourcesResponse message. Also converts values to other types if specified.
             * @param message GetResourcesResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetResourcesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetResourcesResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetFlatViewsRequest. */
        interface IGetFlatViewsRequest {
        }

        /** Represents a GetFlatViewsRequest. */
        class GetFlatViewsRequest implements IGetFlatViewsRequest {

            /**
             * Constructs a new GetFlatViewsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetFlatViewsRequest);

            /**
             * Creates a new GetFlatViewsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetFlatViewsRequest instance
             */
            public static create(properties?: dam.v1.IGetFlatViewsRequest): dam.v1.GetFlatViewsRequest;

            /**
             * Encodes the specified GetFlatViewsRequest message. Does not implicitly {@link dam.v1.GetFlatViewsRequest.verify|verify} messages.
             * @param message GetFlatViewsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetFlatViewsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetFlatViewsRequest message, length delimited. Does not implicitly {@link dam.v1.GetFlatViewsRequest.verify|verify} messages.
             * @param message GetFlatViewsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetFlatViewsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetFlatViewsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetFlatViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetFlatViewsRequest;

            /**
             * Decodes a GetFlatViewsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetFlatViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetFlatViewsRequest;

            /**
             * Verifies a GetFlatViewsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetFlatViewsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetFlatViewsRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetFlatViewsRequest;

            /**
             * Creates a plain object from a GetFlatViewsRequest message. Also converts values to other types if specified.
             * @param message GetFlatViewsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetFlatViewsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetFlatViewsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetFlatViewsResponse. */
        interface IGetFlatViewsResponse {

            /** GetFlatViewsResponse views */
            views?: ({ [k: string]: dam.v1.GetFlatViewsResponse.IFlatView }|null);
        }

        /** Represents a GetFlatViewsResponse. */
        class GetFlatViewsResponse implements IGetFlatViewsResponse {

            /**
             * Constructs a new GetFlatViewsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetFlatViewsResponse);

            /** GetFlatViewsResponse views. */
            public views: { [k: string]: dam.v1.GetFlatViewsResponse.IFlatView };

            /**
             * Creates a new GetFlatViewsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetFlatViewsResponse instance
             */
            public static create(properties?: dam.v1.IGetFlatViewsResponse): dam.v1.GetFlatViewsResponse;

            /**
             * Encodes the specified GetFlatViewsResponse message. Does not implicitly {@link dam.v1.GetFlatViewsResponse.verify|verify} messages.
             * @param message GetFlatViewsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetFlatViewsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetFlatViewsResponse message, length delimited. Does not implicitly {@link dam.v1.GetFlatViewsResponse.verify|verify} messages.
             * @param message GetFlatViewsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetFlatViewsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetFlatViewsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetFlatViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetFlatViewsResponse;

            /**
             * Decodes a GetFlatViewsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetFlatViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetFlatViewsResponse;

            /**
             * Verifies a GetFlatViewsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetFlatViewsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetFlatViewsResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetFlatViewsResponse;

            /**
             * Creates a plain object from a GetFlatViewsResponse message. Also converts values to other types if specified.
             * @param message GetFlatViewsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetFlatViewsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetFlatViewsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GetFlatViewsResponse {

            /** Properties of a FlatView. */
            interface IFlatView {

                /** FlatView resourcePath */
                resourcePath?: (string|null);

                /** FlatView umbrella */
                umbrella?: (string|null);

                /** FlatView resourceName */
                resourceName?: (string|null);

                /** FlatView viewName */
                viewName?: (string|null);

                /** FlatView roleName */
                roleName?: (string|null);

                /** FlatView interfaceName */
                interfaceName?: (string|null);

                /** FlatView interfaceUri */
                interfaceUri?: (string|null);

                /** FlatView contentType */
                contentType?: (string|null);

                /** FlatView version */
                version?: (string|null);

                /** FlatView topic */
                topic?: (string|null);

                /** FlatView partition */
                partition?: (string|null);

                /** FlatView fidelity */
                fidelity?: (string|null);

                /** FlatView geoLocation */
                geoLocation?: (string|null);

                /** FlatView targetAdapter */
                targetAdapter?: (string|null);

                /** FlatView platform */
                platform?: (string|null);

                /** FlatView platformService */
                platformService?: (string|null);

                /** FlatView maxTokenTtl */
                maxTokenTtl?: (string|null);

                /** FlatView resourceUi */
                resourceUi?: ({ [k: string]: string }|null);

                /** FlatView viewUi */
                viewUi?: ({ [k: string]: string }|null);

                /** FlatView roleUi */
                roleUi?: ({ [k: string]: string }|null);
            }

            /** Represents a FlatView. */
            class FlatView implements IFlatView {

                /**
                 * Constructs a new FlatView.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.GetFlatViewsResponse.IFlatView);

                /** FlatView resourcePath. */
                public resourcePath: string;

                /** FlatView umbrella. */
                public umbrella: string;

                /** FlatView resourceName. */
                public resourceName: string;

                /** FlatView viewName. */
                public viewName: string;

                /** FlatView roleName. */
                public roleName: string;

                /** FlatView interfaceName. */
                public interfaceName: string;

                /** FlatView interfaceUri. */
                public interfaceUri: string;

                /** FlatView contentType. */
                public contentType: string;

                /** FlatView version. */
                public version: string;

                /** FlatView topic. */
                public topic: string;

                /** FlatView partition. */
                public partition: string;

                /** FlatView fidelity. */
                public fidelity: string;

                /** FlatView geoLocation. */
                public geoLocation: string;

                /** FlatView targetAdapter. */
                public targetAdapter: string;

                /** FlatView platform. */
                public platform: string;

                /** FlatView platformService. */
                public platformService: string;

                /** FlatView maxTokenTtl. */
                public maxTokenTtl: string;

                /** FlatView resourceUi. */
                public resourceUi: { [k: string]: string };

                /** FlatView viewUi. */
                public viewUi: { [k: string]: string };

                /** FlatView roleUi. */
                public roleUi: { [k: string]: string };

                /**
                 * Creates a new FlatView instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FlatView instance
                 */
                public static create(properties?: dam.v1.GetFlatViewsResponse.IFlatView): dam.v1.GetFlatViewsResponse.FlatView;

                /**
                 * Encodes the specified FlatView message. Does not implicitly {@link dam.v1.GetFlatViewsResponse.FlatView.verify|verify} messages.
                 * @param message FlatView message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.GetFlatViewsResponse.IFlatView, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FlatView message, length delimited. Does not implicitly {@link dam.v1.GetFlatViewsResponse.FlatView.verify|verify} messages.
                 * @param message FlatView message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.GetFlatViewsResponse.IFlatView, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FlatView message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FlatView
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetFlatViewsResponse.FlatView;

                /**
                 * Decodes a FlatView message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FlatView
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetFlatViewsResponse.FlatView;

                /**
                 * Verifies a FlatView message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FlatView message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FlatView
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.GetFlatViewsResponse.FlatView;

                /**
                 * Creates a plain object from a FlatView message. Also converts values to other types if specified.
                 * @param message FlatView
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.GetFlatViewsResponse.FlatView, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FlatView to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a GetResourceRequest. */
        interface IGetResourceRequest {
        }

        /** Represents a GetResourceRequest. */
        class GetResourceRequest implements IGetResourceRequest {

            /**
             * Constructs a new GetResourceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetResourceRequest);

            /**
             * Creates a new GetResourceRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetResourceRequest instance
             */
            public static create(properties?: dam.v1.IGetResourceRequest): dam.v1.GetResourceRequest;

            /**
             * Encodes the specified GetResourceRequest message. Does not implicitly {@link dam.v1.GetResourceRequest.verify|verify} messages.
             * @param message GetResourceRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetResourceRequest message, length delimited. Does not implicitly {@link dam.v1.GetResourceRequest.verify|verify} messages.
             * @param message GetResourceRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetResourceRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetResourceRequest;

            /**
             * Decodes a GetResourceRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetResourceRequest;

            /**
             * Verifies a GetResourceRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetResourceRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetResourceRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetResourceRequest;

            /**
             * Creates a plain object from a GetResourceRequest message. Also converts values to other types if specified.
             * @param message GetResourceRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetResourceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetResourceRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetResourceResponse. */
        interface IGetResourceResponse {

            /** GetResourceResponse resource */
            resource?: (dam.v1.IResource|null);

            /** GetResourceResponse access */
            access?: (string[]|null);
        }

        /** Represents a GetResourceResponse. */
        class GetResourceResponse implements IGetResourceResponse {

            /**
             * Constructs a new GetResourceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetResourceResponse);

            /** GetResourceResponse resource. */
            public resource?: (dam.v1.IResource|null);

            /** GetResourceResponse access. */
            public access: string[];

            /**
             * Creates a new GetResourceResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetResourceResponse instance
             */
            public static create(properties?: dam.v1.IGetResourceResponse): dam.v1.GetResourceResponse;

            /**
             * Encodes the specified GetResourceResponse message. Does not implicitly {@link dam.v1.GetResourceResponse.verify|verify} messages.
             * @param message GetResourceResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetResourceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetResourceResponse message, length delimited. Does not implicitly {@link dam.v1.GetResourceResponse.verify|verify} messages.
             * @param message GetResourceResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetResourceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetResourceResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetResourceResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetResourceResponse;

            /**
             * Decodes a GetResourceResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetResourceResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetResourceResponse;

            /**
             * Verifies a GetResourceResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetResourceResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetResourceResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetResourceResponse;

            /**
             * Creates a plain object from a GetResourceResponse message. Also converts values to other types if specified.
             * @param message GetResourceResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetResourceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetResourceResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewsRequest. */
        interface IGetViewsRequest {
        }

        /** Represents a GetViewsRequest. */
        class GetViewsRequest implements IGetViewsRequest {

            /**
             * Constructs a new GetViewsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewsRequest);

            /**
             * Creates a new GetViewsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewsRequest instance
             */
            public static create(properties?: dam.v1.IGetViewsRequest): dam.v1.GetViewsRequest;

            /**
             * Encodes the specified GetViewsRequest message. Does not implicitly {@link dam.v1.GetViewsRequest.verify|verify} messages.
             * @param message GetViewsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewsRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewsRequest.verify|verify} messages.
             * @param message GetViewsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewsRequest;

            /**
             * Decodes a GetViewsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewsRequest;

            /**
             * Verifies a GetViewsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewsRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewsRequest;

            /**
             * Creates a plain object from a GetViewsRequest message. Also converts values to other types if specified.
             * @param message GetViewsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewsResponse. */
        interface IGetViewsResponse {

            /** GetViewsResponse views */
            views?: ({ [k: string]: dam.v1.IView }|null);

            /** GetViewsResponse access */
            access?: (string[]|null);
        }

        /** Represents a GetViewsResponse. */
        class GetViewsResponse implements IGetViewsResponse {

            /**
             * Constructs a new GetViewsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewsResponse);

            /** GetViewsResponse views. */
            public views: { [k: string]: dam.v1.IView };

            /** GetViewsResponse access. */
            public access: string[];

            /**
             * Creates a new GetViewsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewsResponse instance
             */
            public static create(properties?: dam.v1.IGetViewsResponse): dam.v1.GetViewsResponse;

            /**
             * Encodes the specified GetViewsResponse message. Does not implicitly {@link dam.v1.GetViewsResponse.verify|verify} messages.
             * @param message GetViewsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewsResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewsResponse.verify|verify} messages.
             * @param message GetViewsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewsResponse;

            /**
             * Decodes a GetViewsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewsResponse;

            /**
             * Verifies a GetViewsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewsResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewsResponse;

            /**
             * Creates a plain object from a GetViewsResponse message. Also converts values to other types if specified.
             * @param message GetViewsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewRequest. */
        interface IGetViewRequest {
        }

        /** Represents a GetViewRequest. */
        class GetViewRequest implements IGetViewRequest {

            /**
             * Constructs a new GetViewRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewRequest);

            /**
             * Creates a new GetViewRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewRequest instance
             */
            public static create(properties?: dam.v1.IGetViewRequest): dam.v1.GetViewRequest;

            /**
             * Encodes the specified GetViewRequest message. Does not implicitly {@link dam.v1.GetViewRequest.verify|verify} messages.
             * @param message GetViewRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewRequest.verify|verify} messages.
             * @param message GetViewRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewRequest;

            /**
             * Decodes a GetViewRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewRequest;

            /**
             * Verifies a GetViewRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewRequest;

            /**
             * Creates a plain object from a GetViewRequest message. Also converts values to other types if specified.
             * @param message GetViewRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewResponse. */
        interface IGetViewResponse {

            /** GetViewResponse view */
            view?: (dam.v1.IView|null);

            /** GetViewResponse access */
            access?: (string[]|null);
        }

        /** Represents a GetViewResponse. */
        class GetViewResponse implements IGetViewResponse {

            /**
             * Constructs a new GetViewResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewResponse);

            /** GetViewResponse view. */
            public view?: (dam.v1.IView|null);

            /** GetViewResponse access. */
            public access: string[];

            /**
             * Creates a new GetViewResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewResponse instance
             */
            public static create(properties?: dam.v1.IGetViewResponse): dam.v1.GetViewResponse;

            /**
             * Encodes the specified GetViewResponse message. Does not implicitly {@link dam.v1.GetViewResponse.verify|verify} messages.
             * @param message GetViewResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewResponse.verify|verify} messages.
             * @param message GetViewResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewResponse;

            /**
             * Decodes a GetViewResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewResponse;

            /**
             * Verifies a GetViewResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewResponse;

            /**
             * Creates a plain object from a GetViewResponse message. Also converts values to other types if specified.
             * @param message GetViewResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewRolesRequest. */
        interface IGetViewRolesRequest {
        }

        /** Represents a GetViewRolesRequest. */
        class GetViewRolesRequest implements IGetViewRolesRequest {

            /**
             * Constructs a new GetViewRolesRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewRolesRequest);

            /**
             * Creates a new GetViewRolesRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewRolesRequest instance
             */
            public static create(properties?: dam.v1.IGetViewRolesRequest): dam.v1.GetViewRolesRequest;

            /**
             * Encodes the specified GetViewRolesRequest message. Does not implicitly {@link dam.v1.GetViewRolesRequest.verify|verify} messages.
             * @param message GetViewRolesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewRolesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewRolesRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewRolesRequest.verify|verify} messages.
             * @param message GetViewRolesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewRolesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewRolesRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewRolesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewRolesRequest;

            /**
             * Decodes a GetViewRolesRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewRolesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewRolesRequest;

            /**
             * Verifies a GetViewRolesRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewRolesRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewRolesRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewRolesRequest;

            /**
             * Creates a plain object from a GetViewRolesRequest message. Also converts values to other types if specified.
             * @param message GetViewRolesRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewRolesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewRolesRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewRolesResponse. */
        interface IGetViewRolesResponse {

            /** GetViewRolesResponse roles */
            roles?: ({ [k: string]: dam.v1.IAccessRole }|null);

            /** GetViewRolesResponse access */
            access?: (string[]|null);
        }

        /** Represents a GetViewRolesResponse. */
        class GetViewRolesResponse implements IGetViewRolesResponse {

            /**
             * Constructs a new GetViewRolesResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewRolesResponse);

            /** GetViewRolesResponse roles. */
            public roles: { [k: string]: dam.v1.IAccessRole };

            /** GetViewRolesResponse access. */
            public access: string[];

            /**
             * Creates a new GetViewRolesResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewRolesResponse instance
             */
            public static create(properties?: dam.v1.IGetViewRolesResponse): dam.v1.GetViewRolesResponse;

            /**
             * Encodes the specified GetViewRolesResponse message. Does not implicitly {@link dam.v1.GetViewRolesResponse.verify|verify} messages.
             * @param message GetViewRolesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewRolesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewRolesResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewRolesResponse.verify|verify} messages.
             * @param message GetViewRolesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewRolesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewRolesResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewRolesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewRolesResponse;

            /**
             * Decodes a GetViewRolesResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewRolesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewRolesResponse;

            /**
             * Verifies a GetViewRolesResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewRolesResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewRolesResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewRolesResponse;

            /**
             * Creates a plain object from a GetViewRolesResponse message. Also converts values to other types if specified.
             * @param message GetViewRolesResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewRolesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewRolesResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewRoleRequest. */
        interface IGetViewRoleRequest {
        }

        /** Represents a GetViewRoleRequest. */
        class GetViewRoleRequest implements IGetViewRoleRequest {

            /**
             * Constructs a new GetViewRoleRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewRoleRequest);

            /**
             * Creates a new GetViewRoleRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewRoleRequest instance
             */
            public static create(properties?: dam.v1.IGetViewRoleRequest): dam.v1.GetViewRoleRequest;

            /**
             * Encodes the specified GetViewRoleRequest message. Does not implicitly {@link dam.v1.GetViewRoleRequest.verify|verify} messages.
             * @param message GetViewRoleRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewRoleRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewRoleRequest message, length delimited. Does not implicitly {@link dam.v1.GetViewRoleRequest.verify|verify} messages.
             * @param message GetViewRoleRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewRoleRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewRoleRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewRoleRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewRoleRequest;

            /**
             * Decodes a GetViewRoleRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewRoleRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewRoleRequest;

            /**
             * Verifies a GetViewRoleRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewRoleRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewRoleRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewRoleRequest;

            /**
             * Creates a plain object from a GetViewRoleRequest message. Also converts values to other types if specified.
             * @param message GetViewRoleRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewRoleRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewRoleRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetViewRoleResponse. */
        interface IGetViewRoleResponse {

            /** GetViewRoleResponse role */
            role?: (dam.v1.IAccessRole|null);

            /** GetViewRoleResponse access */
            access?: (string[]|null);
        }

        /** Represents a GetViewRoleResponse. */
        class GetViewRoleResponse implements IGetViewRoleResponse {

            /**
             * Constructs a new GetViewRoleResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetViewRoleResponse);

            /** GetViewRoleResponse role. */
            public role?: (dam.v1.IAccessRole|null);

            /** GetViewRoleResponse access. */
            public access: string[];

            /**
             * Creates a new GetViewRoleResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetViewRoleResponse instance
             */
            public static create(properties?: dam.v1.IGetViewRoleResponse): dam.v1.GetViewRoleResponse;

            /**
             * Encodes the specified GetViewRoleResponse message. Does not implicitly {@link dam.v1.GetViewRoleResponse.verify|verify} messages.
             * @param message GetViewRoleResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetViewRoleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetViewRoleResponse message, length delimited. Does not implicitly {@link dam.v1.GetViewRoleResponse.verify|verify} messages.
             * @param message GetViewRoleResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetViewRoleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetViewRoleResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetViewRoleResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetViewRoleResponse;

            /**
             * Decodes a GetViewRoleResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetViewRoleResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetViewRoleResponse;

            /**
             * Verifies a GetViewRoleResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetViewRoleResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetViewRoleResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetViewRoleResponse;

            /**
             * Creates a plain object from a GetViewRoleResponse message. Also converts values to other types if specified.
             * @param message GetViewRoleResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetViewRoleResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetViewRoleResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTokenRequest. */
        interface IGetTokenRequest {

            /** GetTokenRequest return */
            "return"?: (string|null);

            /** GetTokenRequest dataUse */
            dataUse?: (string|null);

            /** GetTokenRequest ttl */
            ttl?: (number|null);
        }

        /** Represents a GetTokenRequest. */
        class GetTokenRequest implements IGetTokenRequest {

            /**
             * Constructs a new GetTokenRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetTokenRequest);

            /** GetTokenRequest return. */
            public return: string;

            /** GetTokenRequest dataUse. */
            public dataUse: string;

            /** GetTokenRequest ttl. */
            public ttl: number;

            /**
             * Creates a new GetTokenRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTokenRequest instance
             */
            public static create(properties?: dam.v1.IGetTokenRequest): dam.v1.GetTokenRequest;

            /**
             * Encodes the specified GetTokenRequest message. Does not implicitly {@link dam.v1.GetTokenRequest.verify|verify} messages.
             * @param message GetTokenRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTokenRequest message, length delimited. Does not implicitly {@link dam.v1.GetTokenRequest.verify|verify} messages.
             * @param message GetTokenRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTokenRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTokenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTokenRequest;

            /**
             * Decodes a GetTokenRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTokenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTokenRequest;

            /**
             * Verifies a GetTokenRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTokenRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTokenRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetTokenRequest;

            /**
             * Creates a plain object from a GetTokenRequest message. Also converts values to other types if specified.
             * @param message GetTokenRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetTokenRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTokenRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTokenResponse. */
        interface IGetTokenResponse {

            /** GetTokenResponse name */
            name?: (string|null);

            /** GetTokenResponse view */
            view?: (dam.v1.IView|null);

            /** GetTokenResponse account */
            account?: (string|null);

            /** GetTokenResponse token */
            token?: (string|null);

            /** GetTokenResponse ttl */
            ttl?: (string|null);
        }

        /** Represents a GetTokenResponse. */
        class GetTokenResponse implements IGetTokenResponse {

            /**
             * Constructs a new GetTokenResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetTokenResponse);

            /** GetTokenResponse name. */
            public name: string;

            /** GetTokenResponse view. */
            public view?: (dam.v1.IView|null);

            /** GetTokenResponse account. */
            public account: string;

            /** GetTokenResponse token. */
            public token: string;

            /** GetTokenResponse ttl. */
            public ttl: string;

            /**
             * Creates a new GetTokenResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTokenResponse instance
             */
            public static create(properties?: dam.v1.IGetTokenResponse): dam.v1.GetTokenResponse;

            /**
             * Encodes the specified GetTokenResponse message. Does not implicitly {@link dam.v1.GetTokenResponse.verify|verify} messages.
             * @param message GetTokenResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetTokenResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTokenResponse message, length delimited. Does not implicitly {@link dam.v1.GetTokenResponse.verify|verify} messages.
             * @param message GetTokenResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetTokenResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTokenResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTokenResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTokenResponse;

            /**
             * Decodes a GetTokenResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTokenResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTokenResponse;

            /**
             * Verifies a GetTokenResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTokenResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTokenResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetTokenResponse;

            /**
             * Creates a plain object from a GetTokenResponse message. Also converts values to other types if specified.
             * @param message GetTokenResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetTokenResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTokenResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTestResultsRequest. */
        interface IGetTestResultsRequest {
        }

        /** Represents a GetTestResultsRequest. */
        class GetTestResultsRequest implements IGetTestResultsRequest {

            /**
             * Constructs a new GetTestResultsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetTestResultsRequest);

            /**
             * Creates a new GetTestResultsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTestResultsRequest instance
             */
            public static create(properties?: dam.v1.IGetTestResultsRequest): dam.v1.GetTestResultsRequest;

            /**
             * Encodes the specified GetTestResultsRequest message. Does not implicitly {@link dam.v1.GetTestResultsRequest.verify|verify} messages.
             * @param message GetTestResultsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetTestResultsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTestResultsRequest message, length delimited. Does not implicitly {@link dam.v1.GetTestResultsRequest.verify|verify} messages.
             * @param message GetTestResultsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetTestResultsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTestResultsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTestResultsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTestResultsRequest;

            /**
             * Decodes a GetTestResultsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTestResultsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTestResultsRequest;

            /**
             * Verifies a GetTestResultsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTestResultsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTestResultsRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetTestResultsRequest;

            /**
             * Creates a plain object from a GetTestResultsRequest message. Also converts values to other types if specified.
             * @param message GetTestResultsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetTestResultsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTestResultsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTestResultsResponse. */
        interface IGetTestResultsResponse {

            /** GetTestResultsResponse version */
            version?: (string|null);

            /** GetTestResultsResponse revision */
            revision?: (number|Long|null);

            /** GetTestResultsResponse timestamp */
            timestamp?: (number|null);

            /** GetTestResultsResponse personas */
            personas?: ({ [k: string]: dam.v1.ITestPersona }|null);

            /** GetTestResultsResponse testResults */
            testResults?: (dam.v1.GetTestResultsResponse.ITestResult[]|null);

            /** GetTestResultsResponse modification */
            modification?: (dam.v1.IConfigModification|null);

            /** GetTestResultsResponse executed */
            executed?: (number|null);

            /** GetTestResultsResponse passed */
            passed?: (number|null);

            /** GetTestResultsResponse error */
            error?: (string|null);
        }

        /** Represents a GetTestResultsResponse. */
        class GetTestResultsResponse implements IGetTestResultsResponse {

            /**
             * Constructs a new GetTestResultsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetTestResultsResponse);

            /** GetTestResultsResponse version. */
            public version: string;

            /** GetTestResultsResponse revision. */
            public revision: (number|Long);

            /** GetTestResultsResponse timestamp. */
            public timestamp: number;

            /** GetTestResultsResponse personas. */
            public personas: { [k: string]: dam.v1.ITestPersona };

            /** GetTestResultsResponse testResults. */
            public testResults: dam.v1.GetTestResultsResponse.ITestResult[];

            /** GetTestResultsResponse modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /** GetTestResultsResponse executed. */
            public executed: number;

            /** GetTestResultsResponse passed. */
            public passed: number;

            /** GetTestResultsResponse error. */
            public error: string;

            /**
             * Creates a new GetTestResultsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTestResultsResponse instance
             */
            public static create(properties?: dam.v1.IGetTestResultsResponse): dam.v1.GetTestResultsResponse;

            /**
             * Encodes the specified GetTestResultsResponse message. Does not implicitly {@link dam.v1.GetTestResultsResponse.verify|verify} messages.
             * @param message GetTestResultsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetTestResultsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTestResultsResponse message, length delimited. Does not implicitly {@link dam.v1.GetTestResultsResponse.verify|verify} messages.
             * @param message GetTestResultsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetTestResultsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTestResultsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTestResultsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTestResultsResponse;

            /**
             * Decodes a GetTestResultsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTestResultsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTestResultsResponse;

            /**
             * Verifies a GetTestResultsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTestResultsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTestResultsResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetTestResultsResponse;

            /**
             * Creates a plain object from a GetTestResultsResponse message. Also converts values to other types if specified.
             * @param message GetTestResultsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetTestResultsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTestResultsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GetTestResultsResponse {

            /** Properties of a TestResult. */
            interface ITestResult {

                /** TestResult name */
                name?: (string|null);

                /** TestResult result */
                result?: (string|null);

                /** TestResult resources */
                resources?: ({ [k: string]: dam.v1.IAccessList }|null);

                /** TestResult error */
                error?: (string|null);
            }

            /** Represents a TestResult. */
            class TestResult implements ITestResult {

                /**
                 * Constructs a new TestResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.GetTestResultsResponse.ITestResult);

                /** TestResult name. */
                public name: string;

                /** TestResult result. */
                public result: string;

                /** TestResult resources. */
                public resources: { [k: string]: dam.v1.IAccessList };

                /** TestResult error. */
                public error: string;

                /**
                 * Creates a new TestResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestResult instance
                 */
                public static create(properties?: dam.v1.GetTestResultsResponse.ITestResult): dam.v1.GetTestResultsResponse.TestResult;

                /**
                 * Encodes the specified TestResult message. Does not implicitly {@link dam.v1.GetTestResultsResponse.TestResult.verify|verify} messages.
                 * @param message TestResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.GetTestResultsResponse.ITestResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestResult message, length delimited. Does not implicitly {@link dam.v1.GetTestResultsResponse.TestResult.verify|verify} messages.
                 * @param message TestResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.GetTestResultsResponse.ITestResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTestResultsResponse.TestResult;

                /**
                 * Decodes a TestResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTestResultsResponse.TestResult;

                /**
                 * Verifies a TestResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestResult
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.GetTestResultsResponse.TestResult;

                /**
                 * Creates a plain object from a TestResult message. Also converts values to other types if specified.
                 * @param message TestResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.GetTestResultsResponse.TestResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a ClientSecretRequest. */
        interface IClientSecretRequest {
        }

        /** Represents a ClientSecretRequest. */
        class ClientSecretRequest implements IClientSecretRequest {

            /**
             * Constructs a new ClientSecretRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IClientSecretRequest);

            /**
             * Creates a new ClientSecretRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientSecretRequest instance
             */
            public static create(properties?: dam.v1.IClientSecretRequest): dam.v1.ClientSecretRequest;

            /**
             * Encodes the specified ClientSecretRequest message. Does not implicitly {@link dam.v1.ClientSecretRequest.verify|verify} messages.
             * @param message ClientSecretRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IClientSecretRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientSecretRequest message, length delimited. Does not implicitly {@link dam.v1.ClientSecretRequest.verify|verify} messages.
             * @param message ClientSecretRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IClientSecretRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientSecretRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientSecretRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ClientSecretRequest;

            /**
             * Decodes a ClientSecretRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientSecretRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ClientSecretRequest;

            /**
             * Verifies a ClientSecretRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientSecretRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientSecretRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ClientSecretRequest;

            /**
             * Creates a plain object from a ClientSecretRequest message. Also converts values to other types if specified.
             * @param message ClientSecretRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ClientSecretRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientSecretRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClientSecretResponse. */
        interface IClientSecretResponse {

            /** ClientSecretResponse secret */
            secret?: (string|null);
        }

        /** Represents a ClientSecretResponse. */
        class ClientSecretResponse implements IClientSecretResponse {

            /**
             * Constructs a new ClientSecretResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IClientSecretResponse);

            /** ClientSecretResponse secret. */
            public secret: string;

            /**
             * Creates a new ClientSecretResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientSecretResponse instance
             */
            public static create(properties?: dam.v1.IClientSecretResponse): dam.v1.ClientSecretResponse;

            /**
             * Encodes the specified ClientSecretResponse message. Does not implicitly {@link dam.v1.ClientSecretResponse.verify|verify} messages.
             * @param message ClientSecretResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IClientSecretResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientSecretResponse message, length delimited. Does not implicitly {@link dam.v1.ClientSecretResponse.verify|verify} messages.
             * @param message ClientSecretResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IClientSecretResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientSecretResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientSecretResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ClientSecretResponse;

            /**
             * Decodes a ClientSecretResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientSecretResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ClientSecretResponse;

            /**
             * Verifies a ClientSecretResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientSecretResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientSecretResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ClientSecretResponse;

            /**
             * Creates a plain object from a ClientSecretResponse message. Also converts values to other types if specified.
             * @param message ClientSecretResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ClientSecretResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientSecretResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TargetAdaptersRequest. */
        interface ITargetAdaptersRequest {
        }

        /** Represents a TargetAdaptersRequest. */
        class TargetAdaptersRequest implements ITargetAdaptersRequest {

            /**
             * Constructs a new TargetAdaptersRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ITargetAdaptersRequest);

            /**
             * Creates a new TargetAdaptersRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TargetAdaptersRequest instance
             */
            public static create(properties?: dam.v1.ITargetAdaptersRequest): dam.v1.TargetAdaptersRequest;

            /**
             * Encodes the specified TargetAdaptersRequest message. Does not implicitly {@link dam.v1.TargetAdaptersRequest.verify|verify} messages.
             * @param message TargetAdaptersRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ITargetAdaptersRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TargetAdaptersRequest message, length delimited. Does not implicitly {@link dam.v1.TargetAdaptersRequest.verify|verify} messages.
             * @param message TargetAdaptersRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ITargetAdaptersRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TargetAdaptersRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TargetAdaptersRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TargetAdaptersRequest;

            /**
             * Decodes a TargetAdaptersRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TargetAdaptersRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TargetAdaptersRequest;

            /**
             * Verifies a TargetAdaptersRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TargetAdaptersRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TargetAdaptersRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.TargetAdaptersRequest;

            /**
             * Creates a plain object from a TargetAdaptersRequest message. Also converts values to other types if specified.
             * @param message TargetAdaptersRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.TargetAdaptersRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TargetAdaptersRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TargetAdaptersResponse. */
        interface ITargetAdaptersResponse {

            /** TargetAdaptersResponse targetAdapters */
            targetAdapters?: ({ [k: string]: dam.v1.ITargetAdapter }|null);
        }

        /** Represents a TargetAdaptersResponse. */
        class TargetAdaptersResponse implements ITargetAdaptersResponse {

            /**
             * Constructs a new TargetAdaptersResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.ITargetAdaptersResponse);

            /** TargetAdaptersResponse targetAdapters. */
            public targetAdapters: { [k: string]: dam.v1.ITargetAdapter };

            /**
             * Creates a new TargetAdaptersResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TargetAdaptersResponse instance
             */
            public static create(properties?: dam.v1.ITargetAdaptersResponse): dam.v1.TargetAdaptersResponse;

            /**
             * Encodes the specified TargetAdaptersResponse message. Does not implicitly {@link dam.v1.TargetAdaptersResponse.verify|verify} messages.
             * @param message TargetAdaptersResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.ITargetAdaptersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TargetAdaptersResponse message, length delimited. Does not implicitly {@link dam.v1.TargetAdaptersResponse.verify|verify} messages.
             * @param message TargetAdaptersResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.ITargetAdaptersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TargetAdaptersResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TargetAdaptersResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.TargetAdaptersResponse;

            /**
             * Decodes a TargetAdaptersResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TargetAdaptersResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.TargetAdaptersResponse;

            /**
             * Verifies a TargetAdaptersResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TargetAdaptersResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TargetAdaptersResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.TargetAdaptersResponse;

            /**
             * Creates a plain object from a TargetAdaptersResponse message. Also converts values to other types if specified.
             * @param message TargetAdaptersResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.TargetAdaptersResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TargetAdaptersResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PassportTranslatorsRequest. */
        interface IPassportTranslatorsRequest {
        }

        /** Represents a PassportTranslatorsRequest. */
        class PassportTranslatorsRequest implements IPassportTranslatorsRequest {

            /**
             * Constructs a new PassportTranslatorsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IPassportTranslatorsRequest);

            /**
             * Creates a new PassportTranslatorsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PassportTranslatorsRequest instance
             */
            public static create(properties?: dam.v1.IPassportTranslatorsRequest): dam.v1.PassportTranslatorsRequest;

            /**
             * Encodes the specified PassportTranslatorsRequest message. Does not implicitly {@link dam.v1.PassportTranslatorsRequest.verify|verify} messages.
             * @param message PassportTranslatorsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IPassportTranslatorsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PassportTranslatorsRequest message, length delimited. Does not implicitly {@link dam.v1.PassportTranslatorsRequest.verify|verify} messages.
             * @param message PassportTranslatorsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IPassportTranslatorsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PassportTranslatorsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PassportTranslatorsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.PassportTranslatorsRequest;

            /**
             * Decodes a PassportTranslatorsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PassportTranslatorsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.PassportTranslatorsRequest;

            /**
             * Verifies a PassportTranslatorsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PassportTranslatorsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PassportTranslatorsRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.PassportTranslatorsRequest;

            /**
             * Creates a plain object from a PassportTranslatorsRequest message. Also converts values to other types if specified.
             * @param message PassportTranslatorsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.PassportTranslatorsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PassportTranslatorsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a PassportTranslatorsResponse. */
        interface IPassportTranslatorsResponse {

            /** PassportTranslatorsResponse passportTranslators */
            passportTranslators?: ({ [k: string]: dam.v1.IPassportTranslator }|null);
        }

        /** Represents a PassportTranslatorsResponse. */
        class PassportTranslatorsResponse implements IPassportTranslatorsResponse {

            /**
             * Constructs a new PassportTranslatorsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IPassportTranslatorsResponse);

            /** PassportTranslatorsResponse passportTranslators. */
            public passportTranslators: { [k: string]: dam.v1.IPassportTranslator };

            /**
             * Creates a new PassportTranslatorsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PassportTranslatorsResponse instance
             */
            public static create(properties?: dam.v1.IPassportTranslatorsResponse): dam.v1.PassportTranslatorsResponse;

            /**
             * Encodes the specified PassportTranslatorsResponse message. Does not implicitly {@link dam.v1.PassportTranslatorsResponse.verify|verify} messages.
             * @param message PassportTranslatorsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IPassportTranslatorsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PassportTranslatorsResponse message, length delimited. Does not implicitly {@link dam.v1.PassportTranslatorsResponse.verify|verify} messages.
             * @param message PassportTranslatorsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IPassportTranslatorsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PassportTranslatorsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PassportTranslatorsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.PassportTranslatorsResponse;

            /**
             * Decodes a PassportTranslatorsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PassportTranslatorsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.PassportTranslatorsResponse;

            /**
             * Verifies a PassportTranslatorsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PassportTranslatorsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PassportTranslatorsResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.PassportTranslatorsResponse;

            /**
             * Creates a plain object from a PassportTranslatorsResponse message. Also converts values to other types if specified.
             * @param message PassportTranslatorsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.PassportTranslatorsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PassportTranslatorsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DamRoleCategoriesRequest. */
        interface IDamRoleCategoriesRequest {
        }

        /** Represents a DamRoleCategoriesRequest. */
        class DamRoleCategoriesRequest implements IDamRoleCategoriesRequest {

            /**
             * Constructs a new DamRoleCategoriesRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IDamRoleCategoriesRequest);

            /**
             * Creates a new DamRoleCategoriesRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DamRoleCategoriesRequest instance
             */
            public static create(properties?: dam.v1.IDamRoleCategoriesRequest): dam.v1.DamRoleCategoriesRequest;

            /**
             * Encodes the specified DamRoleCategoriesRequest message. Does not implicitly {@link dam.v1.DamRoleCategoriesRequest.verify|verify} messages.
             * @param message DamRoleCategoriesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IDamRoleCategoriesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DamRoleCategoriesRequest message, length delimited. Does not implicitly {@link dam.v1.DamRoleCategoriesRequest.verify|verify} messages.
             * @param message DamRoleCategoriesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IDamRoleCategoriesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DamRoleCategoriesRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DamRoleCategoriesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.DamRoleCategoriesRequest;

            /**
             * Decodes a DamRoleCategoriesRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DamRoleCategoriesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.DamRoleCategoriesRequest;

            /**
             * Verifies a DamRoleCategoriesRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DamRoleCategoriesRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DamRoleCategoriesRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.DamRoleCategoriesRequest;

            /**
             * Creates a plain object from a DamRoleCategoriesRequest message. Also converts values to other types if specified.
             * @param message DamRoleCategoriesRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.DamRoleCategoriesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DamRoleCategoriesRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RoleCategory. */
        interface IRoleCategory {

            /** RoleCategory order */
            order?: (number|null);

            /** RoleCategory ui */
            ui?: ({ [k: string]: string }|null);
        }

        /** Represents a RoleCategory. */
        class RoleCategory implements IRoleCategory {

            /**
             * Constructs a new RoleCategory.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IRoleCategory);

            /** RoleCategory order. */
            public order: number;

            /** RoleCategory ui. */
            public ui: { [k: string]: string };

            /**
             * Creates a new RoleCategory instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RoleCategory instance
             */
            public static create(properties?: dam.v1.IRoleCategory): dam.v1.RoleCategory;

            /**
             * Encodes the specified RoleCategory message. Does not implicitly {@link dam.v1.RoleCategory.verify|verify} messages.
             * @param message RoleCategory message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IRoleCategory, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RoleCategory message, length delimited. Does not implicitly {@link dam.v1.RoleCategory.verify|verify} messages.
             * @param message RoleCategory message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IRoleCategory, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RoleCategory message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RoleCategory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.RoleCategory;

            /**
             * Decodes a RoleCategory message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RoleCategory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.RoleCategory;

            /**
             * Verifies a RoleCategory message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RoleCategory message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RoleCategory
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.RoleCategory;

            /**
             * Creates a plain object from a RoleCategory message. Also converts values to other types if specified.
             * @param message RoleCategory
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.RoleCategory, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RoleCategory to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DamRoleCategoriesResponse. */
        interface IDamRoleCategoriesResponse {

            /** DamRoleCategoriesResponse damRoleCategories */
            damRoleCategories?: ({ [k: string]: dam.v1.IRoleCategory }|null);
        }

        /** Represents a DamRoleCategoriesResponse. */
        class DamRoleCategoriesResponse implements IDamRoleCategoriesResponse {

            /**
             * Constructs a new DamRoleCategoriesResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IDamRoleCategoriesResponse);

            /** DamRoleCategoriesResponse damRoleCategories. */
            public damRoleCategories: { [k: string]: dam.v1.IRoleCategory };

            /**
             * Creates a new DamRoleCategoriesResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DamRoleCategoriesResponse instance
             */
            public static create(properties?: dam.v1.IDamRoleCategoriesResponse): dam.v1.DamRoleCategoriesResponse;

            /**
             * Encodes the specified DamRoleCategoriesResponse message. Does not implicitly {@link dam.v1.DamRoleCategoriesResponse.verify|verify} messages.
             * @param message DamRoleCategoriesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IDamRoleCategoriesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DamRoleCategoriesResponse message, length delimited. Does not implicitly {@link dam.v1.DamRoleCategoriesResponse.verify|verify} messages.
             * @param message DamRoleCategoriesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IDamRoleCategoriesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DamRoleCategoriesResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DamRoleCategoriesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.DamRoleCategoriesResponse;

            /**
             * Decodes a DamRoleCategoriesResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DamRoleCategoriesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.DamRoleCategoriesResponse;

            /**
             * Verifies a DamRoleCategoriesResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DamRoleCategoriesResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DamRoleCategoriesResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.DamRoleCategoriesResponse;

            /**
             * Creates a plain object from a DamRoleCategoriesResponse message. Also converts values to other types if specified.
             * @param message DamRoleCategoriesResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.DamRoleCategoriesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DamRoleCategoriesResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTestPersonasRequest. */
        interface IGetTestPersonasRequest {
        }

        /** Represents a GetTestPersonasRequest. */
        class GetTestPersonasRequest implements IGetTestPersonasRequest {

            /**
             * Constructs a new GetTestPersonasRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetTestPersonasRequest);

            /**
             * Creates a new GetTestPersonasRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTestPersonasRequest instance
             */
            public static create(properties?: dam.v1.IGetTestPersonasRequest): dam.v1.GetTestPersonasRequest;

            /**
             * Encodes the specified GetTestPersonasRequest message. Does not implicitly {@link dam.v1.GetTestPersonasRequest.verify|verify} messages.
             * @param message GetTestPersonasRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetTestPersonasRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTestPersonasRequest message, length delimited. Does not implicitly {@link dam.v1.GetTestPersonasRequest.verify|verify} messages.
             * @param message GetTestPersonasRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetTestPersonasRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTestPersonasRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTestPersonasRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTestPersonasRequest;

            /**
             * Decodes a GetTestPersonasRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTestPersonasRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTestPersonasRequest;

            /**
             * Verifies a GetTestPersonasRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTestPersonasRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTestPersonasRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetTestPersonasRequest;

            /**
             * Creates a plain object from a GetTestPersonasRequest message. Also converts values to other types if specified.
             * @param message GetTestPersonasRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetTestPersonasRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTestPersonasRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTestPersonasResponse. */
        interface IGetTestPersonasResponse {

            /** GetTestPersonasResponse personas */
            personas?: ({ [k: string]: dam.v1.ITestPersona }|null);
        }

        /** Represents a GetTestPersonasResponse. */
        class GetTestPersonasResponse implements IGetTestPersonasResponse {

            /**
             * Constructs a new GetTestPersonasResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IGetTestPersonasResponse);

            /** GetTestPersonasResponse personas. */
            public personas: { [k: string]: dam.v1.ITestPersona };

            /**
             * Creates a new GetTestPersonasResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTestPersonasResponse instance
             */
            public static create(properties?: dam.v1.IGetTestPersonasResponse): dam.v1.GetTestPersonasResponse;

            /**
             * Encodes the specified GetTestPersonasResponse message. Does not implicitly {@link dam.v1.GetTestPersonasResponse.verify|verify} messages.
             * @param message GetTestPersonasResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IGetTestPersonasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTestPersonasResponse message, length delimited. Does not implicitly {@link dam.v1.GetTestPersonasResponse.verify|verify} messages.
             * @param message GetTestPersonasResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IGetTestPersonasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTestPersonasResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTestPersonasResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.GetTestPersonasResponse;

            /**
             * Decodes a GetTestPersonasResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTestPersonasResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.GetTestPersonasResponse;

            /**
             * Verifies a GetTestPersonasResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTestPersonasResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTestPersonasResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.GetTestPersonasResponse;

            /**
             * Creates a plain object from a GetTestPersonasResponse message. Also converts values to other types if specified.
             * @param message GetTestPersonasResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.GetTestPersonasResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTestPersonasResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigModification. */
        interface IConfigModification {

            /** ConfigModification revision */
            revision?: (number|Long|null);

            /** ConfigModification testPersonas */
            testPersonas?: ({ [k: string]: dam.v1.ConfigModification.IPersonaModification }|null);

            /** ConfigModification dryRun */
            dryRun?: (boolean|null);
        }

        /** Represents a ConfigModification. */
        class ConfigModification implements IConfigModification {

            /**
             * Constructs a new ConfigModification.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigModification);

            /** ConfigModification revision. */
            public revision: (number|Long);

            /** ConfigModification testPersonas. */
            public testPersonas: { [k: string]: dam.v1.ConfigModification.IPersonaModification };

            /** ConfigModification dryRun. */
            public dryRun: boolean;

            /**
             * Creates a new ConfigModification instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigModification instance
             */
            public static create(properties?: dam.v1.IConfigModification): dam.v1.ConfigModification;

            /**
             * Encodes the specified ConfigModification message. Does not implicitly {@link dam.v1.ConfigModification.verify|verify} messages.
             * @param message ConfigModification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigModification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigModification message, length delimited. Does not implicitly {@link dam.v1.ConfigModification.verify|verify} messages.
             * @param message ConfigModification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigModification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigModification message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigModification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigModification;

            /**
             * Decodes a ConfigModification message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigModification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigModification;

            /**
             * Verifies a ConfigModification message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigModification message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigModification
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigModification;

            /**
             * Creates a plain object from a ConfigModification message. Also converts values to other types if specified.
             * @param message ConfigModification
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigModification, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigModification to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ConfigModification {

            /** Properties of a PersonaModification. */
            interface IPersonaModification {

                /** PersonaModification resources */
                resources?: ({ [k: string]: dam.v1.IAccessList }|null);

                /** PersonaModification addResources */
                addResources?: ({ [k: string]: dam.v1.IAccessList }|null);

                /** PersonaModification removeResources */
                removeResources?: ({ [k: string]: dam.v1.IAccessList }|null);
            }

            /** Represents a PersonaModification. */
            class PersonaModification implements IPersonaModification {

                /**
                 * Constructs a new PersonaModification.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dam.v1.ConfigModification.IPersonaModification);

                /** PersonaModification resources. */
                public resources: { [k: string]: dam.v1.IAccessList };

                /** PersonaModification addResources. */
                public addResources: { [k: string]: dam.v1.IAccessList };

                /** PersonaModification removeResources. */
                public removeResources: { [k: string]: dam.v1.IAccessList };

                /**
                 * Creates a new PersonaModification instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PersonaModification instance
                 */
                public static create(properties?: dam.v1.ConfigModification.IPersonaModification): dam.v1.ConfigModification.PersonaModification;

                /**
                 * Encodes the specified PersonaModification message. Does not implicitly {@link dam.v1.ConfigModification.PersonaModification.verify|verify} messages.
                 * @param message PersonaModification message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dam.v1.ConfigModification.IPersonaModification, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PersonaModification message, length delimited. Does not implicitly {@link dam.v1.ConfigModification.PersonaModification.verify|verify} messages.
                 * @param message PersonaModification message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dam.v1.ConfigModification.IPersonaModification, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PersonaModification message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PersonaModification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigModification.PersonaModification;

                /**
                 * Decodes a PersonaModification message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PersonaModification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigModification.PersonaModification;

                /**
                 * Verifies a PersonaModification message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PersonaModification message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PersonaModification
                 */
                public static fromObject(object: { [k: string]: any }): dam.v1.ConfigModification.PersonaModification;

                /**
                 * Creates a plain object from a PersonaModification message. Also converts values to other types if specified.
                 * @param message PersonaModification
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dam.v1.ConfigModification.PersonaModification, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PersonaModification to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a ConfigResponse. */
        interface IConfigResponse {
        }

        /** Represents a ConfigResponse. */
        class ConfigResponse implements IConfigResponse {

            /**
             * Constructs a new ConfigResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigResponse);

            /**
             * Creates a new ConfigResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigResponse instance
             */
            public static create(properties?: dam.v1.IConfigResponse): dam.v1.ConfigResponse;

            /**
             * Encodes the specified ConfigResponse message. Does not implicitly {@link dam.v1.ConfigResponse.verify|verify} messages.
             * @param message ConfigResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigResponse message, length delimited. Does not implicitly {@link dam.v1.ConfigResponse.verify|verify} messages.
             * @param message ConfigResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigResponse;

            /**
             * Decodes a ConfigResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigResponse;

            /**
             * Verifies a ConfigResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigResponse
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigResponse;

            /**
             * Creates a plain object from a ConfigResponse message. Also converts values to other types if specified.
             * @param message ConfigResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigRequest. */
        interface IConfigRequest {

            /** ConfigRequest item */
            item?: (dam.v1.IDamConfig|null);

            /** ConfigRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigRequest. */
        class ConfigRequest implements IConfigRequest {

            /**
             * Constructs a new ConfigRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigRequest);

            /** ConfigRequest item. */
            public item?: (dam.v1.IDamConfig|null);

            /** ConfigRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigRequest instance
             */
            public static create(properties?: dam.v1.IConfigRequest): dam.v1.ConfigRequest;

            /**
             * Encodes the specified ConfigRequest message. Does not implicitly {@link dam.v1.ConfigRequest.verify|verify} messages.
             * @param message ConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigRequest.verify|verify} messages.
             * @param message ConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigRequest;

            /**
             * Decodes a ConfigRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigRequest;

            /**
             * Verifies a ConfigRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigRequest;

            /**
             * Creates a plain object from a ConfigRequest message. Also converts values to other types if specified.
             * @param message ConfigRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigResourceRequest. */
        interface IConfigResourceRequest {

            /** ConfigResourceRequest item */
            item?: (dam.v1.IResource|null);

            /** ConfigResourceRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigResourceRequest. */
        class ConfigResourceRequest implements IConfigResourceRequest {

            /**
             * Constructs a new ConfigResourceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigResourceRequest);

            /** ConfigResourceRequest item. */
            public item?: (dam.v1.IResource|null);

            /** ConfigResourceRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigResourceRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigResourceRequest instance
             */
            public static create(properties?: dam.v1.IConfigResourceRequest): dam.v1.ConfigResourceRequest;

            /**
             * Encodes the specified ConfigResourceRequest message. Does not implicitly {@link dam.v1.ConfigResourceRequest.verify|verify} messages.
             * @param message ConfigResourceRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigResourceRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigResourceRequest.verify|verify} messages.
             * @param message ConfigResourceRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigResourceRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigResourceRequest;

            /**
             * Decodes a ConfigResourceRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigResourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigResourceRequest;

            /**
             * Verifies a ConfigResourceRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigResourceRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigResourceRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigResourceRequest;

            /**
             * Creates a plain object from a ConfigResourceRequest message. Also converts values to other types if specified.
             * @param message ConfigResourceRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigResourceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigResourceRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigViewRequest. */
        interface IConfigViewRequest {

            /** ConfigViewRequest item */
            item?: (dam.v1.IView|null);

            /** ConfigViewRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigViewRequest. */
        class ConfigViewRequest implements IConfigViewRequest {

            /**
             * Constructs a new ConfigViewRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigViewRequest);

            /** ConfigViewRequest item. */
            public item?: (dam.v1.IView|null);

            /** ConfigViewRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigViewRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigViewRequest instance
             */
            public static create(properties?: dam.v1.IConfigViewRequest): dam.v1.ConfigViewRequest;

            /**
             * Encodes the specified ConfigViewRequest message. Does not implicitly {@link dam.v1.ConfigViewRequest.verify|verify} messages.
             * @param message ConfigViewRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigViewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigViewRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigViewRequest.verify|verify} messages.
             * @param message ConfigViewRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigViewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigViewRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigViewRequest;

            /**
             * Decodes a ConfigViewRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigViewRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigViewRequest;

            /**
             * Verifies a ConfigViewRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigViewRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigViewRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigViewRequest;

            /**
             * Creates a plain object from a ConfigViewRequest message. Also converts values to other types if specified.
             * @param message ConfigViewRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigViewRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigViewRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigTrustedPassportIssuerRequest. */
        interface IConfigTrustedPassportIssuerRequest {

            /** ConfigTrustedPassportIssuerRequest item */
            item?: (dam.v1.ITrustedPassportIssuer|null);

            /** ConfigTrustedPassportIssuerRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigTrustedPassportIssuerRequest. */
        class ConfigTrustedPassportIssuerRequest implements IConfigTrustedPassportIssuerRequest {

            /**
             * Constructs a new ConfigTrustedPassportIssuerRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigTrustedPassportIssuerRequest);

            /** ConfigTrustedPassportIssuerRequest item. */
            public item?: (dam.v1.ITrustedPassportIssuer|null);

            /** ConfigTrustedPassportIssuerRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigTrustedPassportIssuerRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigTrustedPassportIssuerRequest instance
             */
            public static create(properties?: dam.v1.IConfigTrustedPassportIssuerRequest): dam.v1.ConfigTrustedPassportIssuerRequest;

            /**
             * Encodes the specified ConfigTrustedPassportIssuerRequest message. Does not implicitly {@link dam.v1.ConfigTrustedPassportIssuerRequest.verify|verify} messages.
             * @param message ConfigTrustedPassportIssuerRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigTrustedPassportIssuerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigTrustedPassportIssuerRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigTrustedPassportIssuerRequest.verify|verify} messages.
             * @param message ConfigTrustedPassportIssuerRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigTrustedPassportIssuerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigTrustedPassportIssuerRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigTrustedPassportIssuerRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigTrustedPassportIssuerRequest;

            /**
             * Decodes a ConfigTrustedPassportIssuerRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigTrustedPassportIssuerRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigTrustedPassportIssuerRequest;

            /**
             * Verifies a ConfigTrustedPassportIssuerRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigTrustedPassportIssuerRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigTrustedPassportIssuerRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigTrustedPassportIssuerRequest;

            /**
             * Creates a plain object from a ConfigTrustedPassportIssuerRequest message. Also converts values to other types if specified.
             * @param message ConfigTrustedPassportIssuerRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigTrustedPassportIssuerRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigTrustedPassportIssuerRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigTrustedSourceRequest. */
        interface IConfigTrustedSourceRequest {

            /** ConfigTrustedSourceRequest item */
            item?: (dam.v1.ITrustedSource|null);

            /** ConfigTrustedSourceRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigTrustedSourceRequest. */
        class ConfigTrustedSourceRequest implements IConfigTrustedSourceRequest {

            /**
             * Constructs a new ConfigTrustedSourceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigTrustedSourceRequest);

            /** ConfigTrustedSourceRequest item. */
            public item?: (dam.v1.ITrustedSource|null);

            /** ConfigTrustedSourceRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigTrustedSourceRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigTrustedSourceRequest instance
             */
            public static create(properties?: dam.v1.IConfigTrustedSourceRequest): dam.v1.ConfigTrustedSourceRequest;

            /**
             * Encodes the specified ConfigTrustedSourceRequest message. Does not implicitly {@link dam.v1.ConfigTrustedSourceRequest.verify|verify} messages.
             * @param message ConfigTrustedSourceRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigTrustedSourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigTrustedSourceRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigTrustedSourceRequest.verify|verify} messages.
             * @param message ConfigTrustedSourceRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigTrustedSourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigTrustedSourceRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigTrustedSourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigTrustedSourceRequest;

            /**
             * Decodes a ConfigTrustedSourceRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigTrustedSourceRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigTrustedSourceRequest;

            /**
             * Verifies a ConfigTrustedSourceRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigTrustedSourceRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigTrustedSourceRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigTrustedSourceRequest;

            /**
             * Creates a plain object from a ConfigTrustedSourceRequest message. Also converts values to other types if specified.
             * @param message ConfigTrustedSourceRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigTrustedSourceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigTrustedSourceRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigPolicyRequest. */
        interface IConfigPolicyRequest {

            /** ConfigPolicyRequest item */
            item?: (dam.v1.IPolicy|null);

            /** ConfigPolicyRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigPolicyRequest. */
        class ConfigPolicyRequest implements IConfigPolicyRequest {

            /**
             * Constructs a new ConfigPolicyRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigPolicyRequest);

            /** ConfigPolicyRequest item. */
            public item?: (dam.v1.IPolicy|null);

            /** ConfigPolicyRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigPolicyRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigPolicyRequest instance
             */
            public static create(properties?: dam.v1.IConfigPolicyRequest): dam.v1.ConfigPolicyRequest;

            /**
             * Encodes the specified ConfigPolicyRequest message. Does not implicitly {@link dam.v1.ConfigPolicyRequest.verify|verify} messages.
             * @param message ConfigPolicyRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigPolicyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigPolicyRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigPolicyRequest.verify|verify} messages.
             * @param message ConfigPolicyRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigPolicyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigPolicyRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigPolicyRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigPolicyRequest;

            /**
             * Decodes a ConfigPolicyRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigPolicyRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigPolicyRequest;

            /**
             * Verifies a ConfigPolicyRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigPolicyRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigPolicyRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigPolicyRequest;

            /**
             * Creates a plain object from a ConfigPolicyRequest message. Also converts values to other types if specified.
             * @param message ConfigPolicyRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigPolicyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigPolicyRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigOptionsRequest. */
        interface IConfigOptionsRequest {

            /** ConfigOptionsRequest item */
            item?: (dam.v1.IConfigOptions|null);

            /** ConfigOptionsRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigOptionsRequest. */
        class ConfigOptionsRequest implements IConfigOptionsRequest {

            /**
             * Constructs a new ConfigOptionsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigOptionsRequest);

            /** ConfigOptionsRequest item. */
            public item?: (dam.v1.IConfigOptions|null);

            /** ConfigOptionsRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigOptionsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigOptionsRequest instance
             */
            public static create(properties?: dam.v1.IConfigOptionsRequest): dam.v1.ConfigOptionsRequest;

            /**
             * Encodes the specified ConfigOptionsRequest message. Does not implicitly {@link dam.v1.ConfigOptionsRequest.verify|verify} messages.
             * @param message ConfigOptionsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigOptionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigOptionsRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigOptionsRequest.verify|verify} messages.
             * @param message ConfigOptionsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigOptionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigOptionsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigOptionsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigOptionsRequest;

            /**
             * Decodes a ConfigOptionsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigOptionsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigOptionsRequest;

            /**
             * Verifies a ConfigOptionsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigOptionsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigOptionsRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigOptionsRequest;

            /**
             * Creates a plain object from a ConfigOptionsRequest message. Also converts values to other types if specified.
             * @param message ConfigOptionsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigOptionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigOptionsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigClaimDefinitionRequest. */
        interface IConfigClaimDefinitionRequest {

            /** ConfigClaimDefinitionRequest item */
            item?: (dam.v1.IClaimDefinition|null);

            /** ConfigClaimDefinitionRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigClaimDefinitionRequest. */
        class ConfigClaimDefinitionRequest implements IConfigClaimDefinitionRequest {

            /**
             * Constructs a new ConfigClaimDefinitionRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigClaimDefinitionRequest);

            /** ConfigClaimDefinitionRequest item. */
            public item?: (dam.v1.IClaimDefinition|null);

            /** ConfigClaimDefinitionRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigClaimDefinitionRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigClaimDefinitionRequest instance
             */
            public static create(properties?: dam.v1.IConfigClaimDefinitionRequest): dam.v1.ConfigClaimDefinitionRequest;

            /**
             * Encodes the specified ConfigClaimDefinitionRequest message. Does not implicitly {@link dam.v1.ConfigClaimDefinitionRequest.verify|verify} messages.
             * @param message ConfigClaimDefinitionRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigClaimDefinitionRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigClaimDefinitionRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigClaimDefinitionRequest.verify|verify} messages.
             * @param message ConfigClaimDefinitionRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigClaimDefinitionRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigClaimDefinitionRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigClaimDefinitionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigClaimDefinitionRequest;

            /**
             * Decodes a ConfigClaimDefinitionRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigClaimDefinitionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigClaimDefinitionRequest;

            /**
             * Verifies a ConfigClaimDefinitionRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigClaimDefinitionRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigClaimDefinitionRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigClaimDefinitionRequest;

            /**
             * Creates a plain object from a ConfigClaimDefinitionRequest message. Also converts values to other types if specified.
             * @param message ConfigClaimDefinitionRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigClaimDefinitionRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigClaimDefinitionRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigServiceTemplateRequest. */
        interface IConfigServiceTemplateRequest {

            /** ConfigServiceTemplateRequest item */
            item?: (dam.v1.IServiceTemplate|null);

            /** ConfigServiceTemplateRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigServiceTemplateRequest. */
        class ConfigServiceTemplateRequest implements IConfigServiceTemplateRequest {

            /**
             * Constructs a new ConfigServiceTemplateRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigServiceTemplateRequest);

            /** ConfigServiceTemplateRequest item. */
            public item?: (dam.v1.IServiceTemplate|null);

            /** ConfigServiceTemplateRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigServiceTemplateRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigServiceTemplateRequest instance
             */
            public static create(properties?: dam.v1.IConfigServiceTemplateRequest): dam.v1.ConfigServiceTemplateRequest;

            /**
             * Encodes the specified ConfigServiceTemplateRequest message. Does not implicitly {@link dam.v1.ConfigServiceTemplateRequest.verify|verify} messages.
             * @param message ConfigServiceTemplateRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigServiceTemplateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigServiceTemplateRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigServiceTemplateRequest.verify|verify} messages.
             * @param message ConfigServiceTemplateRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigServiceTemplateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigServiceTemplateRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigServiceTemplateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigServiceTemplateRequest;

            /**
             * Decodes a ConfigServiceTemplateRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigServiceTemplateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigServiceTemplateRequest;

            /**
             * Verifies a ConfigServiceTemplateRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigServiceTemplateRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigServiceTemplateRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigServiceTemplateRequest;

            /**
             * Creates a plain object from a ConfigServiceTemplateRequest message. Also converts values to other types if specified.
             * @param message ConfigServiceTemplateRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigServiceTemplateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigServiceTemplateRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigTestPersonaRequest. */
        interface IConfigTestPersonaRequest {

            /** ConfigTestPersonaRequest item */
            item?: (dam.v1.ITestPersona|null);

            /** ConfigTestPersonaRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigTestPersonaRequest. */
        class ConfigTestPersonaRequest implements IConfigTestPersonaRequest {

            /**
             * Constructs a new ConfigTestPersonaRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigTestPersonaRequest);

            /** ConfigTestPersonaRequest item. */
            public item?: (dam.v1.ITestPersona|null);

            /** ConfigTestPersonaRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigTestPersonaRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigTestPersonaRequest instance
             */
            public static create(properties?: dam.v1.IConfigTestPersonaRequest): dam.v1.ConfigTestPersonaRequest;

            /**
             * Encodes the specified ConfigTestPersonaRequest message. Does not implicitly {@link dam.v1.ConfigTestPersonaRequest.verify|verify} messages.
             * @param message ConfigTestPersonaRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigTestPersonaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigTestPersonaRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigTestPersonaRequest.verify|verify} messages.
             * @param message ConfigTestPersonaRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigTestPersonaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigTestPersonaRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigTestPersonaRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigTestPersonaRequest;

            /**
             * Decodes a ConfigTestPersonaRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigTestPersonaRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigTestPersonaRequest;

            /**
             * Verifies a ConfigTestPersonaRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigTestPersonaRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigTestPersonaRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigTestPersonaRequest;

            /**
             * Creates a plain object from a ConfigTestPersonaRequest message. Also converts values to other types if specified.
             * @param message ConfigTestPersonaRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigTestPersonaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigTestPersonaRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConfigClientRequest. */
        interface IConfigClientRequest {

            /** ConfigClientRequest item */
            item?: (dam.v1.IClient|null);

            /** ConfigClientRequest modification */
            modification?: (dam.v1.IConfigModification|null);
        }

        /** Represents a ConfigClientRequest. */
        class ConfigClientRequest implements IConfigClientRequest {

            /**
             * Constructs a new ConfigClientRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: dam.v1.IConfigClientRequest);

            /** ConfigClientRequest item. */
            public item?: (dam.v1.IClient|null);

            /** ConfigClientRequest modification. */
            public modification?: (dam.v1.IConfigModification|null);

            /**
             * Creates a new ConfigClientRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigClientRequest instance
             */
            public static create(properties?: dam.v1.IConfigClientRequest): dam.v1.ConfigClientRequest;

            /**
             * Encodes the specified ConfigClientRequest message. Does not implicitly {@link dam.v1.ConfigClientRequest.verify|verify} messages.
             * @param message ConfigClientRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dam.v1.IConfigClientRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigClientRequest message, length delimited. Does not implicitly {@link dam.v1.ConfigClientRequest.verify|verify} messages.
             * @param message ConfigClientRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dam.v1.IConfigClientRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigClientRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigClientRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dam.v1.ConfigClientRequest;

            /**
             * Decodes a ConfigClientRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigClientRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dam.v1.ConfigClientRequest;

            /**
             * Verifies a ConfigClientRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigClientRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigClientRequest
             */
            public static fromObject(object: { [k: string]: any }): dam.v1.ConfigClientRequest;

            /**
             * Creates a plain object from a ConfigClientRequest message. Also converts values to other types if specified.
             * @param message ConfigClientRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dam.v1.ConfigClientRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigClientRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
