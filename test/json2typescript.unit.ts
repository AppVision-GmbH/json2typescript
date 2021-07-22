import { JsonConvert } from "../src/json2typescript/json-convert";
import {
    OperationMode,
    PropertyConvertingMode,
    PropertyMatchingRule,
    ValueCheckingMode
} from "../src/json2typescript/json-convert-enums";
import { Any } from "../src/json2typescript/any";
import { MappingOptions, Settings } from "../src/json2typescript/json-convert-options";
import { Human } from "./model/typescript/human";
import { Cat } from "./model/typescript/cat";
import { Dog } from "./model/typescript/dog";
import { IHuman } from "./model/json/i-human";
import { ICat } from "./model/json/i-cat";
import { IDog } from "./model/json/i-dog";
import { DuplicateCat } from "./model/typescript/duplicate-cat";
import { DateConverter } from "./model/typescript/date-converter";
import { OptionalCat } from './model/typescript/optional-cat';

describe('Unit tests', () => {

    const jsonConvert = new JsonConvert();

    describe('JsonConvert', () => {

        // JSON DATA
        let human1JsonObject: IHuman = {
            givenName: "Andreas",
            lastName: "Muster"
        };
        let human2JsonObject: IHuman = {
            givenName: "Michael",
            name: "Meier"
        };
        let cat1JsonObject: ICat = {
            catName: "Meowy",
            district: 100,
            owner: human1JsonObject,
            talky: true,
            other: "cute",
            friends: []
        };
        let cat2JsonObject: ICat = {
            catName: "Links",
            district: 50,
            talky: true,
            other: "sweet",
            birthdate: "2014-09-01"
        };
        let dog1JsonObject: IDog = {
            name: "Barky",
            barking: true,
            other: 1.1,
        };

        // TYPESCRIPT INSTANCES
        let human1 = new Human();
        human1.firstname = "Andreas";
        human1.lastname = "Muster";

        let human2 = new Human();
        human2.firstname = "Michael";
        human2.lastname = "Meier";

        let cat1 = new Cat();
        cat1.name = "Meowy";
        cat1.district = 100;
        cat1.owner = human1;
        cat1.talky = true;
        cat1.other = "cute";
        cat1.friends = [];

        let cat2 = new Cat();
        cat2.name = "Links";
        cat2.district = 50;
        cat2.other = "sweet";
        cat2.birthdate = new Date("2014-09-01");
        cat2.friends = null;
        cat2.talky = true;

        let dog1 = new Dog();
        dog1.name = "Barky";
        dog1.isBarking = true;
        dog1.owner = null;
        dog1.other = 1.1;

        let duplicateCat1 = new DuplicateCat();
        duplicateCat1.name = "Duplicate";
        duplicateCat1.district = new Date("2014-10-01");
        duplicateCat1.talky = new Date("2015-02-03");

        // TYPESCRIPT OPTIONAL INSTANCES
        let optionalCat1 = new OptionalCat();
        optionalCat1.name = "MaybeMeowy";

        // SETUP CHECKS
        describe('setup checks', () => {
            it('JsonConvert instance', () => {

                let jsonConvertTest: JsonConvert;

                jsonConvertTest = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_OBJECT_NULL, false);
                expect(jsonConvertTest.operationMode).toEqual(OperationMode.ENABLE);
                expect(jsonConvertTest.valueCheckingMode).toEqual(ValueCheckingMode.ALLOW_OBJECT_NULL);
                expect(jsonConvertTest.ignorePrimitiveChecks).toEqual(false);
                expect(jsonConvertTest.ignoreRequiredCheck).toEqual(false);

                jsonConvertTest = new JsonConvert(OperationMode.DISABLE, ValueCheckingMode.ALLOW_NULL, true);
                expect(jsonConvertTest.operationMode).toEqual(OperationMode.DISABLE);
                expect(jsonConvertTest.valueCheckingMode).toEqual(ValueCheckingMode.ALLOW_NULL);
                expect(jsonConvertTest.ignorePrimitiveChecks).toEqual(true);
                expect(jsonConvertTest.ignoreRequiredCheck).toEqual(false);

                jsonConvertTest = new JsonConvert(OperationMode.LOGGING, ValueCheckingMode.DISALLOW_NULL, false);
                expect(jsonConvertTest.operationMode).toEqual(OperationMode.LOGGING);
                expect(jsonConvertTest.valueCheckingMode).toEqual(ValueCheckingMode.DISALLOW_NULL);
                expect(jsonConvertTest.ignorePrimitiveChecks).toEqual(false);
                expect(jsonConvertTest.ignoreRequiredCheck).toEqual(false);

                jsonConvertTest = new JsonConvert();
                expect(jsonConvertTest.operationMode).toEqual(OperationMode.ENABLE);
                expect(jsonConvertTest.valueCheckingMode).toEqual(ValueCheckingMode.ALLOW_OBJECT_NULL);
                expect(jsonConvertTest.ignorePrimitiveChecks).toEqual(false);
                expect(jsonConvertTest.ignoreRequiredCheck).toEqual(false);

            });

            it('JsonObject decorator', () => {
                expect((<any>human1)[Settings.CLASS_IDENTIFIER]).toEqual("Human");
                expect((<any>cat1)[Settings.CLASS_IDENTIFIER]).toEqual("Kitty");
                expect((<any>dog1)[Settings.CLASS_IDENTIFIER]).toEqual("Dog");
            });
        });

        // NULL/UNDEFINED CHECKS
        describe('null/undefined checks', () => {
            it('serialize and deserialize null', () => {

                jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

                let t_cat = (<any>jsonConvert).deserialize(null, Cat);
                expect(t_cat).toEqual(null);
                let t_catJsonObject = (<any>jsonConvert).serialize(null);
                expect(t_catJsonObject).toEqual(null);

                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;

                expect(() => (<any>jsonConvert).deserialize(null, Cat)).toThrow();
                expect(() => (<any>jsonConvert).serialize(null)).toThrow();

            });
            it('deserialize and serialize undefined', () => {

                jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

                expect(() => (<any>jsonConvert).deserialize(undefined, Cat)).toThrowError();
                expect(() => (<any>jsonConvert).serialize(undefined)).toThrowError();

            });
        });

        // BASIC CHECKS
        describe('basic checks', () => {
            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

            it('serialize and deserialize same data', () => {
                let t_catJsonObject = (<any>jsonConvert).serialize(cat1);
                expect(t_catJsonObject).toEqual(cat1JsonObject);
                let t_cat = (<any>jsonConvert).deserialize(t_catJsonObject, Cat);
                expect(t_cat).toEqual(cat1);
            });
            it('deserialize and serialize same data', () => {
                let t_cat = (<any>jsonConvert).deserialize(cat1JsonObject, Cat);
                expect(t_cat).toEqual(cat1);
                let t_catJsonObject = (<any>jsonConvert).serialize(t_cat);
                expect(t_catJsonObject).toEqual(cat1JsonObject);
            });
        });

        // PRIVATE METHODS
        describe('private methods', () => {

            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

            describe('serializeObject_loopProperty()', () => {
                let t_cat: any;
                beforeEach( () => {
                    t_cat = {};
                } );

                it('should serialize property with different class and JSON names', () => {
                    (<any>jsonConvert).serializeObject_loopProperty(cat1, cat1, "name", t_cat);
                    expect((<any>t_cat)["catName"]).toBe(cat1.name);
                });
                it('should serialize property with no declared property name', () => {
                    (<any>jsonConvert).serializeObject_loopProperty(cat1, cat1, "district", t_cat);
                    expect((<any>t_cat)["district"]).toBe(100);
                });
                it('should serialize a child object property', () => {
                    (<any>jsonConvert).serializeObject_loopProperty(cat1, cat1, "owner", t_cat);
                    expect((<any>t_cat)["owner"]["givenName"]).toBe("Andreas");
                });
                it('should throw an error if required property is missing', () => {
                    expect( function () {
                        ( <any>jsonConvert ).serializeObject_loopProperty( optionalCat1, optionalCat1, 'district', t_cat )
                    } ).toThrowError( 'Fatal error in JsonConvert. ' +
                        'Failed to map the JavaScript instance of class "OptionalKitty" to JSON because the defined class property ' +
                        '"district" does not exist or is not defined:\n\n' +
                        '\tClass property: \n\t\tdistrict\n\n' +
                        '\tJSON property: \n\t\tdistrictNumber\n\n' );
                });
                it('should not throw an error if required property is missing but ignoreRequiredCheck flag set', () => {
                    jsonConvert.ignoreRequiredCheck = true;
                    ( <any>jsonConvert ).serializeObject_loopProperty( optionalCat1, optionalCat1, 'district', t_cat );
                    expect( ( <any>t_cat )[ 'district' ] ).toBeUndefined( 'No value set, but no error thrown' );
                    jsonConvert.ignoreRequiredCheck = false;
                });
            });
            describe('deserializeObject_loopProperty()', () => {
                let t_cat: Cat;
                beforeEach( () => {
                    t_cat = new Cat();
                } );

                it( 'should deserialize properties', () => {
                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'name', { 'catName': 'Meowy' } );
                    expect( t_cat.name ).toEqual( 'Meowy' );
                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'district', { 'district': 100 } );
                    expect( t_cat.district ).toEqual( 100 );
                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'owner', {
                        'owner': {
                            givenName: 'Andreas',
                            lastName: 'Muster'
                        }
                    } );
                    expect( t_cat.owner!.lastname ).toEqual( 'Muster' );

                    let t_dog = new Dog();
                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_dog, 'name', { 'name': 'Barky' } );
                    expect( t_dog.name ).toEqual( 'Barky' );

                    jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_INSENSITIVE;

                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'name', { 'catName': 'Meowy' } );
                    expect( t_cat.name ).toEqual( 'Meowy' );
                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'name', { 'catNAME': 'Meowy' } );
                    expect( t_cat.name ).toEqual( 'Meowy' );
                    expect( () => ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'name', { 'catNames': 'Meowy' } ) ).toThrow();

                    jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_STRICT;
                } );
                it( 'should throw an error if required property is missing', () => {
                    expect( function () {
                        ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'name', {} );
                    } ).toThrowError( 'Fatal error in JsonConvert. ' +
                      'Failed to map the JSON object to the class "Kitty" because the defined JSON property "catName" does not exist:\n\n' +
                      '\tClass property: \n\t\tname\n\n' +
                      '\tJSON property: \n\t\tcatName\n\n'
                    );
                } );
                it( 'should not throw an error if required property is missing but ignoreRequiredCheck flag is set', () => {
                    jsonConvert.ignoreRequiredCheck = true;
                    ( <any>jsonConvert ).deserializeObject_loopProperty( t_cat, 'name', {} );
                    expect( t_cat.name ).toEqual( '', 'Value not set because not present, default value used' );
                    jsonConvert.ignoreRequiredCheck = false;
                } );
            });

            jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;

            it('serializeObject_loopProperty()', () => {
                let t_cat = {};
                (<any>jsonConvert).serializeObject_loopProperty(cat2, cat2, "owner", t_cat);
                expect((<any>t_cat)["owner"]).toBe(undefined);
            });
            it('deserializeObject_loopProperty()', () => {
                let t_cat = new Cat();
                (<any>jsonConvert).deserializeObject_loopProperty(t_cat, "owner", { "owner": null });
                expect(t_cat.owner).toBe(null);

            });

        });

        // HELPER METHODS
        describe('helper methods', () => {

            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

            it('getClassPropertyMappingOptions()', () => {
                /* The actual JSON types used are not strings, even though MappingOption.expectedJsonType is typed as string,
                 * so obscure this by assigning the expected JSON type to an "any" variable. */
                let jsonType: any = String;
                const catNameMapping = new MappingOptions();
                catNameMapping.classPropertyName = "name";
                catNameMapping.jsonPropertyName = "catName";
                catNameMapping.expectedJsonType = jsonType;
                catNameMapping.isOptional = PropertyConvertingMode.NEVER_OPTIONAL;
                catNameMapping.customConverter = null;
                expect((<any>jsonConvert).getClassPropertyMappingOptions(cat1, "name")).toEqual(catNameMapping);

                const dogNameMapping = new MappingOptions();
                dogNameMapping.classPropertyName = "name";
                dogNameMapping.jsonPropertyName = "name";
                dogNameMapping.expectedJsonType = jsonType;
                dogNameMapping.isOptional = PropertyConvertingMode.NEVER_OPTIONAL;
                dogNameMapping.customConverter = null;
                expect((<any>jsonConvert).getClassPropertyMappingOptions(dog1, "name")).toEqual(dogNameMapping);

                // Check that mapped property on "sibling" DuplicateCat class with same name as Cat property
                // but different type is handled correctly
                const duplicateCatTalkyMapping = new MappingOptions();
                duplicateCatTalkyMapping.classPropertyName = "talky";
                duplicateCatTalkyMapping.jsonPropertyName = "talky";
                duplicateCatTalkyMapping.expectedJsonType = undefined;
                duplicateCatTalkyMapping.isOptional = PropertyConvertingMode.NEVER_OPTIONAL;
                duplicateCatTalkyMapping.customConverter = new DateConverter();
                expect((<any>jsonConvert).getClassPropertyMappingOptions(duplicateCat1, "talky")).toEqual(duplicateCatTalkyMapping);

                expect((<any>jsonConvert).getClassPropertyMappingOptions(human1, "name")).toBeNull();
                // Unmapped property should not return mapping, even though property is the same name as a mapped property on another class
                expect((<any>jsonConvert).getClassPropertyMappingOptions(duplicateCat1, "district")).toBeNull();
            });
            describe("verifyProperty()", () => {
                let jsonConvert: JsonConvert;
                beforeEach(() => {
                    jsonConvert = new JsonConvert();
                    jsonConvert.ignorePrimitiveChecks = false;
                    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                });
                describe("expectedJsonType unmapped", () => {
                    it("should return the value if expected type is Any, Object, or null", () => {
                        expect((<any>jsonConvert).verifyProperty(Any, cat1, true)).toBe(cat1);
                        expect((<any>jsonConvert).verifyProperty(Object, cat1, false)).toBe(cat1);
                        expect((<any>jsonConvert).verifyProperty(null, cat1, true)).toBe(cat1);
                    });
                    it("should NOT throw an error even if null not allowed", () => {
                        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
                        expect((<any>jsonConvert).verifyProperty(Any, null, true)).toBeNull("expected Any");
                        expect((<any>jsonConvert).verifyProperty(Object, null, false)).toBeNull("expected Object");
                        expect((<any>jsonConvert).verifyProperty(null, null, true)).toBeNull("expected null");
                    });
                });
                describe("expectedJsonType mapped class", () => {
                    it("should correctly serialize/deserialize a mapped object property", () => {
                        expect((<any>jsonConvert).verifyProperty(Cat, cat2, true)).toEqual(cat2JsonObject);
                        expect((<any>jsonConvert).verifyProperty(Cat, cat1JsonObject, false)).toEqual(cat1);
                    });
                    it("should return null if allowed", () => {
                        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL;
                        expect((<any>jsonConvert).verifyProperty(Cat, null, true))
                            .toBeNull("serializing null returns null");
                        expect((<any>jsonConvert).verifyProperty(Cat, null, false))
                            .toBeNull("deserializing null returns null");
                    });
                    it("should throw an error if null not allowed", () => {
                        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
                        const errorMessage = "\tReason: Given value is null.";
                        expect(() => (<any>jsonConvert).verifyProperty(Cat, null, true))
                            .toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty(Cat, null, false))
                            .toThrowError(errorMessage);
                    });
                    it("should throw an error if value is an array", () => {
                        expect(() => (<any>jsonConvert).verifyProperty(Cat, [cat1, cat2], true))
                            .toThrowError("\tReason: Given value is array, but expected a non-array type.");
                    });
                });
                describe("expectedJsonType primitive", () => {
                    it("should correctly serialize and deserialize expected primitive values", () => {
                        expect((<any>jsonConvert).verifyProperty(String, "Andreas", false)).toBe("Andreas");
                        expect((<any>jsonConvert).verifyProperty(Number, 2.2, false)).toBe(2.2);
                        expect((<any>jsonConvert).verifyProperty(Boolean, true, true)).toBe(true);
                    });
                    it("should error if expected JSON type doesn't match value type", () => {
                        const errorMessage = "\tReason: Given object does not match the expected primitive type.";
                        expect(() => (<any>jsonConvert).verifyProperty(Number, "Andreas", false)).toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty(String, true, true)).toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty(Boolean, 54, true)).toThrowError(errorMessage);
                    });
                    it("should return value if expected JSON type doesn't match value type but flag set", () => {
                        jsonConvert.ignorePrimitiveChecks = true;
                        expect((<any>jsonConvert).verifyProperty(Number, "Andreas", false)).toBe("Andreas");
                        expect((<any>jsonConvert).verifyProperty(String, true, true)).toBe(true);
                        expect((<any>jsonConvert).verifyProperty(Boolean, 54, true)).toBe(54);
                    });
                    it("should return null if nulls allowed", () => {
                        expect((<any>jsonConvert).verifyProperty(String, null, false)).toBeNull("expected string should be null");
                        expect((<any>jsonConvert).verifyProperty(Number, null, false)).toBeNull("expected number should be null");
                        expect((<any>jsonConvert).verifyProperty(Boolean, null, true)).toBeNull("expected boolean should be null");
                    });
                    it("should throw an error if only object nulls allowed", () => {
                        const errorMessage = "\tReason: Given value is null.";
                        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL;
                        expect(() => (<any>jsonConvert).verifyProperty(String, null, false))
                            .toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty(Number, null, false))
                            .toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty(Boolean, null, true))
                            .toThrowError(errorMessage);
                    });
                    it("should throw an error if value is an array", () => {
                        expect(() => (<any>jsonConvert).verifyProperty(String, ["Andreas", "Joseph"], true))
                            .toThrowError("\tReason: Given value is array, but expected a non-array type.");
                    });
                });
                describe("expectedJsonType array", () => {
                    it("should return value as-is if expected type is empty", () => {
                        const pseudoArray = {
                            "0": "Andreas",
                            "1": {"0": true, "1": 2.2}
                        };
                        expect((<any>jsonConvert).verifyProperty([], pseudoArray, true)).toBe(pseudoArray);
                        expect((<any>jsonConvert).verifyProperty([], cat1, false)).toBe(cat1);
                    });
                    it("should return empty array if value is empty", () => {
                        expect((<any>jsonConvert).verifyProperty([String], [], true)).toEqual([]);
                        expect((<any>jsonConvert).verifyProperty([String, [Boolean, Number]], [], false)).toEqual([]);
                        expect((<any>jsonConvert).verifyProperty([Cat], [], false)).toEqual([]);
                    });
                    it("should correctly handle array of object types", () => {
                        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                        expect((<any>jsonConvert).verifyProperty([Cat], [cat1, cat2], true))
                            .toEqual([cat1JsonObject, cat2JsonObject]);
                        expect((<any>jsonConvert).verifyProperty([Cat], [cat1JsonObject, cat2JsonObject], false))
                            .toEqual([cat1, cat2]);
                    });
                    it("should correctly handle expected nested array types", () => {
                        expect((<any>jsonConvert).verifyProperty([String, [Boolean, Number]], ["Andreas", [true, 2.2]], false))
                            .toEqual(["Andreas", [true, 2.2]]);
                        expect((<any>jsonConvert).verifyProperty([String, [Boolean, Number]], {
                            "0": "Andreas",
                            "1": {"0": true, "1": 2.2}
                        }, true)).toEqual(["Andreas", [true, 2.2]]);
                    });
                    it("should expand expected array type as needed without affecting original mapping", () => {
                        const expectedJsonType = [String];
                        expect((<any>jsonConvert).verifyProperty(expectedJsonType, ["Andreas", "Joseph", "Albert"], true))
                            .toEqual(["Andreas", "Joseph", "Albert"]);
                        expect(expectedJsonType).toEqual([String]);

                        expect((<any>jsonConvert).verifyProperty(expectedJsonType, {"0": "Andreas", "1": "Joseph", "2": "Albert"}))
                            .toEqual(["Andreas", "Joseph", "Albert"]);
                        expect(expectedJsonType).toEqual([String]);
                    });
                    it("should throw an error if expected array and value is primitive", () => {
                        const errorMessage = "\tReason: Expected type is array, but given value is primitive."
                        expect(() => (<any>jsonConvert).verifyProperty([String], "Andreas"))
                            .toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty([], "Andreas"))
                            .toThrowError(errorMessage);
                    });
                    it("should return null if nulls allowed", () => {
                        expect((<any>jsonConvert).verifyProperty([String], null, true))
                            .toBeNull("expected string array should be null");
                        expect((<any>jsonConvert).verifyProperty([String, [Boolean, Number]], null, true))
                            .toBeNull("expected nested array should be null");
                    });
                    it("should throw an error if nulls disallowed", () => {
                        const errorMessage = "\tReason: Given value is null.";
                        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
                        expect(() => (<any>jsonConvert).verifyProperty([String], null, true))
                            .toThrowError(errorMessage);
                        expect(() => (<any>jsonConvert).verifyProperty([String, [Boolean, Number]], null, true))
                            .toThrowError(errorMessage);
                    });
                });
            });
            it('getObjectValue()', () => {
                expect((<any>jsonConvert).getObjectValue({ "name": "Andreas" }, "name")).toBe("Andreas");
                expect(() => (<any>jsonConvert).getObjectValue({ "nAmE": "Andreas" }, "NaMe")).toThrow();

                jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_INSENSITIVE;

                expect((<any>jsonConvert).getObjectValue({ "nAmE": "Andreas" }, "NaMe")).toBe("Andreas");

                jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_STRICT;
            });

        });

        // JSON2TYPESCRIPT TYPES
        describe('json2typescript types', () => {

            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

            it('getExpectedType()', () => {
                expect((<any>jsonConvert).getExpectedType(JsonConvert)).toBe("JsonConvert");
                expect((<any>jsonConvert).getExpectedType([String, [Boolean, Number]])).toBe("[string,[boolean,number]]");
                expect((<any>jsonConvert).getExpectedType([[null, Any], Object])).toBe("[[any,any],any]");
                expect((<any>jsonConvert).getExpectedType(undefined)).toBe("undefined");
                expect((<any>jsonConvert).getExpectedType("?")).toBe("?????");
            });
            it('getJsonType()', () => {
                expect((<any>jsonConvert).getJsonType({name: "Andreas"})).toBe("object");
                expect((<any>jsonConvert).getJsonType(["a", 0, [true, null]])).toBe("[string,number,[boolean,null]]");
            });
            it('getTrueType()', () => {
                expect((<any>jsonConvert).getTrueType(new JsonConvert())).toBe("object");
                expect((<any>jsonConvert).getTrueType({name: "Andreas"})).toBe("object");
                expect((<any>jsonConvert).getTrueType("Andreas")).toBe("string");
            });

        });

    });

});
