/**
 * Enum for the operation mode of a JsonConvert instance.
 *
 * The values should be used as follows:
 * - DISABLE: json2typescript will be disabled, no type checking or mapping is done
 * - ENABLE: json2typescript is enabled, but only errors are logged
 * - LOGGING: json2typescript is enabled and detailed information is logged
 *
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
export enum OperationMode {
    DISABLE = 0,
    ENABLE = 1,
    LOGGING = 2
};

/**
 * Enum for the property matching mode of a JsonConvert instance.
 *
 * The values should be used as follows:
 * - CASE_STRICT: JSON properties need to match exactly the names in the decorators
 * - CASE_INSENSITIVE: JSON properties need to match names in the decorators, but names they are not case sensitive
 *
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
export enum PropertyMatchingRule {
    CASE_STRICT = 1,
    CASE_INSENSITIVE = 2
};

/**
 * Enum for the value checking mode of a JsonConvert instance.
 *
 * The values should be used as follows:
 * - ALLOW_NULL: all given values in the JSON are allowed to be null
 * - ALLOW_OBJECT_NULL: objects in the JSON are allowed to be null, primitive types are not allowed to be null
 * - DISALLOW_NULL: no null values are tolerated in the JSON
 *
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
export enum ValueCheckingMode {
    ALLOW_NULL = 1,
    ALLOW_OBJECT_NULL = 2,
    DISALLOW_NULL = 3
};


/**
 * Enum for the property converting mode of a property (de)serialized with JsonConvert.
 *
 * The values should be used as follows:
 * - NEVER_OPTIONAL: the property is never optional
 * - ALWAYS_OPTIONAL: the property is always optional
 * - SERIALIZE_OPTIONAL: the property is optional in serialization only
 * - DESERIALIZE_OPTIONAL: the property is optional in deserialization only
 *
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
export enum PropertyConvertingMode {
    NEVER_OPTIONAL = 0,
    ALWAYS_OPTIONAL = 1,
    SERIALIZE_OPTIONAL = 2,
    DESERIALIZE_OPTIONAL = 3
};
