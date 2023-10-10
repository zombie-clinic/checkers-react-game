    
export function jsonStringifyUnescaped(data) {
    
    const escapedJsonString = JSON.stringify(data, null, 2);
    const unescapedJsonObject = JSON.parse(escapedJsonString);
    const cleanJsonString = JSON.stringify(unescapedJsonObject, null, 2);
    // console.log('this is gotta be "cleaned" JSON string data')
    // console.log(cleanJsonString);
    return cleanJsonString;
    }
