export const useSpecs = () => {
  const on = useState('specs', () => false)
  const toggle = () => (on.value = !on.value)
  return { on, toggle }
}
