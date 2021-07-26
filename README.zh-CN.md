## px2unit

将 `px`单位自动转化成其他单位，如 `vw`、`rem`

![preview](/demo.gif)

## 支持语言

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

## 配置

> 💡 All fields must be prefixed with `px2unit.` in settings

|field|Default|Description|
|--|--|--|
|fixedDigits|2|小数点保留几位数|
|autoRemovePrefixZero|true|小数点前为0的话，自动删去|
|addMark|false|是否添加注释|
|ingores|`[]`|忽略文件列表|
|languages|`['html', 'vue', 'css', 'postcss', 'less', 'scss', 'sass', 'stylus', 'javascriptreact', 'typescriptreact' ]`|支持语言的列表

### `px2unit.transformRules`

this field is an array with the follow object

```ts
interface TransformRules {
  sourceWidth: number;
  destinationWidth: number;
  unit: string;
}
```

转换规则很简单，如果你输入`1px`，插件会自动计算出结果(`${1 * destinationWidth/sourceWidth}${unit}`)

举个例子，如果你使用`vw`单位来做开发，且给到你的设计稿尺寸宽度为`375`像素，那么你可以使用以下的配置:

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

插件会自动计算出结果供你选择

![demo1](/demo1.gif)

默认的配置
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

## 感谢

- [vscode-cssrem](https://github.com/cipchk/vscode-cssrem)