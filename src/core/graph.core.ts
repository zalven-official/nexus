import { ref, type Ref } from 'vue'

export const END = 'END-STATE-GRAPH'
export class StateGraph<T> {
  private nodes: Map<string, (state: T) => T | Promise<T>>
  private conditionalEdges: Map<string, (state: T) => string | Promise<string>>
  private edges: Map<string, string[]>
  private entryPoint: string | null
  private state: Ref
  private recursionLimit: number

  public constructor(state: T, recursionLimit = 150) {
    this.state = ref(state)
    this.nodes = new Map()
    this.edges = new Map()
    this.conditionalEdges = new Map()
    this.entryPoint = null
    this.recursionLimit = recursionLimit
  }

  addNode(name: string, fn: (state: T) => T | Promise<T>): void {
    this.nodes.set(name, fn)
  }

  setEntryPoint(name: string): void {
    if (!this.nodes.has(name)) {
      throw new Error(`Node ${name} does not exist`)
    }
    this.entryPoint = name
  }

  addEdge(startNode: string, endNode: string): void {
    if (!this.nodes.has(startNode) || !this.nodes.has(endNode)) {
      throw new Error(`Nodes ${startNode} or ${endNode} do not exist`)
    }
    if (!this.edges.has(startNode)) {
      this.edges.set(startNode, [])
    }
    this.edges.get(startNode)!.push(endNode)
  }

  addConditionalEdge(
    startNode: string,
    nextNode: string | ((state: T) => string | Promise<string>)
  ): void {
    if (!this.nodes.has(startNode)) {
      throw new Error(`Node ${startNode} does not exist`)
    }
    if (typeof nextNode === 'function') {
      this.conditionalEdges.set(startNode, nextNode)
    } else {
      this.conditionalEdges.set(startNode, async () => nextNode)
    }
  }

  compile(): () => Promise<void> {
    if (!this.entryPoint) {
      throw new Error('Entry point not set')
    }
    const executeNode = async (node: string, depth: number = 0) => {
      if (depth >= this.recursionLimit) {
        throw new Error(`Recursion limit exceeded at node ${node}`)
      }
      const fn = this.nodes.get(node)
      if (fn) {
        this.state.value = await fn(this.state.value)
      }
      if (this.conditionalEdges.has(node)) {
        const nextNode = await this.conditionalEdges.get(node)!(this.state.value)
        if (nextNode !== END) {
          await executeNode(nextNode, depth + 1)
        }
      } else {
        const nextNode = this.edges.get(node)?.[0]
        if (nextNode) await executeNode(nextNode, depth + 1)
      }
    }
    return async () => {
      await executeNode(this.entryPoint!)
    }
  }
}
