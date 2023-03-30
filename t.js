const schema = {
  random_key: {
    type: "string",
  },
  second_key: {
    type: "object",
    properties: {
      third_key: {
        type: "array",
        items: {
          type: "object",
          properties: {
            fourth_key: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const data = {
  random_key: "random_value",
  second_key: {
    third_key: [
      {
        fourth_key: "fourth_value",
      },
    ],
  },
};

const output = {
  random_key: {
    type: "string",
    value: "random_value",
  },
  second_key: {
    type: "object",
    value: {
      third_key: {
        type: "array",
        value: [
          {
            fourth_key: {
              type: "string",
              value: "fourth_value",
            },
          },
        ],
      },
    },
  },
};

function merge(schema, data) {
  const result = {};

  for (const [key, value] of Object.entries(schema)) {
    if (value.type === "object") {
      result[key] = {
        type: "object",
        value: merge(value.properties, data[key]),
      };
    } else if (value.type === "array") {
      result[key] = {
        type: "array",
        value: data[key].map((item) => merge(value.items.properties, item)),
      };
    } else {
      result[key] = {
        type: value.type,
        value: data[key],
      };
    }
  }

  return result;
}

// function merge(_schema, _data) {
//   const result = {};
//   for (const key in _schema) {
//     if (_schema.hasOwnProperty(key)) {
//       const element = _schema[key];
//       if (element.type === "object") {
//         result[key] = {
//           type: element.type,
//           value: merge(element.properties, _data[key]),
//         };
//       } else if (element.type === "array") {
//         result[key] = {
//           type: element.type,
//           value: _data[key].map((item) =>
//             merge(element.items.properties, item)
//           ),
//         };
//       } else {
//         result[key] = {
//           type: element.type,
//           value: _data[key],
//         };
//       }
//     }
//   }
//   return result;
// }

console.log(JSON.stringify(merge(schema, data), null, 2));
