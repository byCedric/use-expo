<div align="center">  
    <h1>useApplicationInstallTime</h1>  
    <p>Get the time the app was installed on the device with <a href="https://docs.expo.io/versions/latest/sdk/application/"><code>Application</code></a></p>  
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
const [installTime, getInstallTime] = useApplicationInstallTime();  

// other options  
useApplicationInstallTime({ get: false });  
```  
  
  
## Example  
  
```jsx  
import { useApplicationInstallTime } from '@use-expo/application';  
import { Text, View } from 'react-native';  
  
function ApplicationInstallTimeExample() {  
 const [installTime] = useApplicationInstallTime(); 
  
 return (
   <View>
     <Text>Install time: {installTime ? installTime.toString() : '-'}</Text>
   </View>
 );
}   
```  
  
  
## API  
  
```ts    
function useApplicationInstallTime(options?: Options): Result;  
  
interface Options {  
  /** If it should fetch the application install time when mounted, defaults to `true` */  
  get?: boolean;  
}
  
type Result = [  
 /** The current application install time */
 Date | undefined,
 /** Callback to manually get the application install time */
 () => Promise<Date>,];  
```  
  
<div align="center">  
    <br />  
    with :heart: <strong>byCedric</strong>  
    <br />  
</div>
