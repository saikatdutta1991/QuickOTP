
# QuickOTP
*This javascript plugin helps to render otp input for any project.*

## Screen Shot

![enter image description here](https://raw.githubusercontent.com/saikatdutta1991/QuickOTP/master/screenshot.png)


## Usage
- import `.css` and `.js` file inside the html page.

```javascript
 <link  rel="stylesheet"  href="quickotp.css">
```
```javascript
<script  src="quickotp.js"></script>
```

- Add container where you need to render the OTP input box in your body html.
```html
<div id="otp-holder"></div>
```
- Now initialise the QuickOTP library followed after importing `quickotp.js` with config and render.
```javascript
<script>
	let  qinstance = new  QuickOTP("#otp-holder", { 
		otpLength :  6,
		boxSize :  "50px",
		boxColor :  "#d35400",
		fontSize :  "27px"
	}).render();
</script>
```

- To get the otp code entered by user. Call the instance method. `getOtp()`
```javascript
<script>
	qinstance.getOtp();
</script>
```
Thanks. That's all guys for now.
