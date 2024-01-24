import ReactDOM from 'react-dom'
import { App } from '@/App'

console.log('test render')
const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
render()
