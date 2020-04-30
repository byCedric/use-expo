<div align="center">  
    <h1>useApplicationIosIdForVendor</h1>  
    <p>Get the app's vendor ID with <a href="https://docs.expo.io/versions/latest/sdk/application/"><code>Application</code></a></p>  
    <sup>  
        <a href="https://github.com/bycedric/use-expo/releases">  
            <img src="https://img.shields.io/github/release/byCedric/use-expo/all.svg?style=flat-square" alt="releases" />  
        </a>  
        <a href="https://github.com/bycedric/use-expo/actions">  
            <img src="https://img.shields.io/github/workflow/status/byCedric/use-expo/Packages/master.svg?style=flat-square" alt="builds" />  
        </a>  
        <a href="https://exp.host/@bycedric/use-expo">  
            <img src="https://img.shields.io/badge/demo-expo.io-lightgrey.svg?style=flat-square" alt="demo" />  
        </a>  
    </sup>  
    <br />  
    <p align="center">  
        <a href="https://github.com/byCedric/use-expo#readme"><b>Other hooks</b></a>  
        &nbsp;&nbsp;&mdash;&nbsp;&nbsp;  
        <a href="https://github.com/byCedric/use-expo#usage"><b>Usage</b></a>  
        &nbsp;&nbsp;&mdash;&nbsp;&nbsp;  
        <a href="https://github.com/byCedric/use-expo/blob/master/CHANGELOG.md"><b>Changelog</b></a>  
    </p>  
    <br />  
    <pre>expo install @use-expo/application expo-application</pre>  
    <br />  
</div>  
  
## Usage  
  
```jsx  
// full hook  
const [vendorId, getVendorId] = useApplicationIosIdForVendor();  

// other options  
useApplicationIosIdForVendor({ get: false });  
```  
  
  
## Example  
  
```jsx  
import { useApplicationInstallTime } from '@use-expo/application';  
import { Text, View } from 'react-native';  
  
function ApplicationIosIdForVendorExample() {  
 const [vendorId] = useApplicationIosIdForVendor(); 
  
 return (
   <View>
     <Text>Application vendor id: {vendorId || '-'}</Text>
   </View>
 );
}   
```  
  
  
## API  
  
```ts    
function useApplicationIosIdForVendor(options?: Options): Result;  
  
interface Options {  
  /** If it should fetch the application vendor id when mounted, defaults to `true` */  
  get?: boolean;  
}
  
type Result = [  
 /** The current application vendor id */
 string | undefined,
 /** Callback to manually get the application vendor id */
 () => Promise<string>,];  
```  
  
<div align="center">  
    <br />  
    with :heart: <strong>byCedric</strong>  
    <br />  
</div>
