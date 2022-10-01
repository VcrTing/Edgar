import header from "./header/header"

import parse from "./parse/parse"

import tool from "./tool/tool"

const parse_array = function(f) {
    let res = parse.parse_array(f)
    return res ? [ res[0], tool.array_split(res[1]) ] : [ ]
}

export default { header, parse_array, csv_map: tool.csv_map }