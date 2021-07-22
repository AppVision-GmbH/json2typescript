import {JsonObject, JsonProperty} from "../../../src/json2typescript/json-convert-decorators";
import {Animal} from "./animal";

@JsonObject("AnimalHolder")
export class AnimalHolder {

    @JsonProperty("name", String)
    name: string = "";

    @JsonProperty("animal", Animal)
    animal: Animal = null;

    constructor() {}

}
