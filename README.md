## px2unit

[中文版本](/README.zh-CN.md)

convert `px` to other unit，like `vw`、`rem`...

![preview](/demo.gif)

## Support Languages

- html
- vue
- css
- less
- scss
- sass
- stylus
- tpl(php smarty3)
- tsx
- jsx

## Configurations

> 💡 All fields must be prefixed with `px2unit.` in settings

|field|Default|Description|
|--|--|--|
|fixedDigits|2|decimal point maximum length|
|autoRemovePrefixZero|true|Automatically remove prefix 0|
|addMark|false|Whether to enabled mark|
|ingores|`[]`|Ignore file list|
|languages|`['html', 'vue', 'css', 'postcss', 'less', 'scss', 'sass', 'stylus', 'javascriptreact', 'typescriptreact' ]`|Support language list

### `px2unit.transformRules`

this field is an array with the follow object

```ts
interface TransformRules {
  title?: string;
  sourceWidth: number;
  destinationWidth: number;
  unit: string;
}
```

the transform rule is simple, if you print `1px`, it will auto show the convert value(`${1 * destinationWidth/sourceWidth}${unit}`)

for example, if you use `Viewport Width(vw)` and your design width is `375px`，you can use the follow Configurations

```json
{
  "px2unit": {
    "transformRules": [
      {
        "sourceWidth": 375,
        "destinationWidth": 100,
        "unit": "vw"
      }
    ]
  }
}
```

and it will auto convert what you want 

![demo1](/demo1.gif)

default transformRules
```js
[
  {
    sourceWidth: 375,
    destinationWidth: 10,
    unit: 'rem'
  },
  {
    sourceWidth: 375,
    destinationWidth: 100,
    unit: 'vw'
  },
  {
    sourceWidth: 375,
    destinationWidth: 750,
    unit: 'rpx'
  }
]
```

## Thanks

- [vscode-cssrem](https://github.com/cipchk/vscode-cssrem)