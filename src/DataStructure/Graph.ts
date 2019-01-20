import { ArrayQueue } from './Queue'

/**
 * @description 图的边类
 */
export class GraphEdge<E> {
  value: E
  weight: number // 权重

  constructor(value: E, weight: number) {
    this.value = value
    this.weight = weight
  }

  public toString(): string {
    return `${this.value}(${this.weight})`
  }
}

/**
 * @description 基于邻接矩阵 (Adjacency matrix) 的图。常用于稠密图
 */
export class AMGraph<E> {
  private isDirected: boolean // 是否为有向图
  private vertices: E[]
  private adjMatrix: number[][]

  constructor(isDirected: boolean = false) {
    this.isDirected = isDirected
    this.vertices = new Array<E>()
    this.adjMatrix = new Array<number[]>()
  }

  private reorganize(): void {
    const len = this.vertices.length

    if (len > this.adjMatrix.length) {
      this.adjMatrix.forEach(e => e.push(0))
      this.adjMatrix.push(new Array<number>(len).fill(0))
    }
  }

  public addVertex(e: E): void {
    if (this.vertices.includes(e)) return

    this.vertices.push(e)
    this.reorganize()
  }

  public addEdge(vertexA: E, vertexB: E, weight: number = 1) {
    const indexA = this.vertices.findIndex(e => e === vertexA)
    const indexB = this.vertices.findIndex(e => e === vertexB)

    if (indexA === -1 || indexB === -1) {
      throw new Error(`${vertexA} or ${vertexB} doesn't exist!`)
    }

    if (!this.isDirected) {
      this.adjMatrix[indexB][indexA] = weight
    }
    this.adjMatrix[indexA][indexB] = weight
  }

  public toString(): string {
    let verticesStr: string = ''
    let contentStr: string = ''

    this.vertices.forEach((e, i) => {
      verticesStr += `${e}  `
      contentStr += `${e}  `
      this.adjMatrix[i].forEach(l => {
        contentStr += `${l}  `
      })
      contentStr += '\n'
    })

    return `AMGraph: \n   ${verticesStr}\n${contentStr}`
  }
}

/**
 * @description 基于邻接表 (Adjacency table) 的图。常用于稀疏图
 */
export class ATGraph<E> {
  private vertices: Set<E>
  private adjTable: Map<E, GraphEdge<E>[]>
  private isDirected: boolean

  constructor(isDirected: boolean = false) {
    this.vertices = new Set<E>()
    this.adjTable = new Map<E, GraphEdge<E>[]>()
    this.isDirected = isDirected
  }

  private _dfs(startVertex: E, visitedVertices: E[]): void {
    const neighbors = this.adjTable.get(startVertex) as GraphEdge<E>[]
    visitedVertices.push(startVertex)

    for (let i = 0; i < neighbors.length; i++) {
      const currentVertex = neighbors[i].value

      if (!visitedVertices.includes(currentVertex)) {
        this._dfs(currentVertex, visitedVertices)
      }
    }
  }

  public addVertex(e: E): void {
    this.vertices.add(e)

    if (this.adjTable.has(e)) return
    else this.adjTable.set(e, new Array<GraphEdge<E>>())
  }

  public addEdge(vertexA: E, vertexB: E, weight: number = 1): void {
    if (!this.vertices.has(vertexA) || !this.vertices.has(vertexB)) {
      throw new Error(`${vertexA} or ${vertexB} doesn't exist!`)
    }

    const edgeA = new GraphEdge<E>(vertexA, weight)
    const edgeB = new GraphEdge<E>(vertexB, weight)

    if (!this.isDirected) {
      ;(this.adjTable.get(vertexB) as Array<GraphEdge<E>>).push(edgeA)
    }
    ;(this.adjTable.get(vertexA) as Array<GraphEdge<E>>).push(edgeB)
  }

  // 广度优先遍历（breadthFirstSearch）
  public bfs(startVertex: E): E[] {
    if (!this.vertices.has(startVertex)) throw new Error(`The vertex doesn't exist.`)

    const visitedVertices = new Array<E>()
    const queue = new ArrayQueue<E>()

    queue.enqueue(startVertex)
    visitedVertices.push(startVertex)

    while (!queue.isEmpty()) {
      const vertex = queue.dequeue()
      const neighbors = this.adjTable.get(vertex) as GraphEdge<E>[]

      for (let i = 0; i < neighbors.length; i++) {
        const currentVertex = neighbors[i].value

        if (!visitedVertices.includes(currentVertex)) {
          queue.enqueue(currentVertex)
          visitedVertices.push(currentVertex)
        }
      }
    }

    return visitedVertices
  }

  // 深度优先遍历（depthFirstSearch）
  public dfs(startVertex: E): E[] {
    if (!this.vertices.has(startVertex)) throw new Error(`The vertex doesn't exist.`)

    const visitedVertices = new Array<E>()
    this._dfs(startVertex, visitedVertices)

    return visitedVertices
  }

  public toString(): string {
    let str: string = ''

    this.vertices.forEach(e => {
      str += `${e} -> `

      const neighbors = this.adjTable.get(e) as GraphEdge<E>[]
      neighbors.forEach(e => (str += `${e} `))

      str += '\n'
    })

    return `ATGraph: \n${str}`
  }
}
