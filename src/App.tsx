import { JsonViewer } from '@textea/json-viewer'

export const App = () => {
  return (
    <div>
      <JsonViewer value={{ a: 1, b: 2 }} />
    </div>
  )
}
