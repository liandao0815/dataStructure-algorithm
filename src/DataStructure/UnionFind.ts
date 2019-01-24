/**
 * @description 并查集接口
 */
interface UnionFind {
  isConnected(p: number, q: number): boolean
  union(p: number, q: number): void
  getSize(): number
}

/**
 * @description 第一版 Union-find
 */
export class UnionFind1 implements UnionFind {
  private id: number[]

  constructor(size: number) {
    this.id = new Array<number>(size)

    for (let i = 0; i < this.id.length; i++) {
      this.id[i] = i
    }
  }

  private find(p: number): number {
    if (p < 0 || p >= this.id.length) {
      throw new Error('p is out of bound')
    }

    return this.id[p]
  }

  public getSize(): number {
    return this.id.length
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const pID = this.find(p)
    const qID = this.find(q)

    if (pID === qID) return

    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pID) this.id[i] === qID
    }
  }
}

/**
 * @description 第二版 Union-Find
 */
export class UnionFind2 implements UnionFind {
  private parent: number[]

  constructor(size: number) {
    this.parent = new Array<number>(size)

    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i
    }
  }

  private find(p: number): number {
    if (p < 0 || p >= this.parent.length) {
      throw new Error('p is out of bound')
    }

    while (p !== this.parent[p]) p = this.parent[p]

    return p
  }

  public getSize(): number {
    return this.parent.length
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    if (pRoot === qRoot) return

    this.parent[pRoot] = qRoot
  }
}

/**
 * @description 第三版 Union-Find
 */
export class UnionFind3 implements UnionFind {
  private parent: number[]
  private size: number[]

  constructor(size: number) {
    this.parent = new Array<number>(size)
    this.size = new Array<number>(size)

    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i
      this.size[i] = 1
    }
  }

  private find(p: number): number {
    if (p < 0 || p >= this.parent.length) {
      throw new Error('p is out of bound')
    }

    while (p !== this.parent[p]) p = this.parent[p]

    return p
  }

  public getSize(): number {
    return this.parent.length
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    if (pRoot === qRoot) return

    if (this.size[pRoot] < this.size[qRoot]) {
      this.parent[pRoot] = qRoot
      this.size[qRoot] += this.size[pRoot]
    } else {
      this.parent[qRoot] = pRoot
      this.size[pRoot] += this.size[qRoot]
    }
  }
}

/**
 * @description 第四版 Union-Find
 */
export class UnionFind4 implements UnionFind {
  private parent: number[]
  private rank: number[]

  constructor(size: number) {
    this.parent = new Array<number>(size)
    this.rank = new Array<number>(size)

    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i
      this.rank[i] = 1
    }
  }

  private find(p: number): number {
    if (p < 0 || p >= this.parent.length) {
      throw new Error('p is out of bound')
    }

    while (p !== this.parent[p]) p = this.parent[p]

    return p
  }

  public getSize(): number {
    return this.parent.length
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    if (pRoot === qRoot) return

    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot
    } else {
      this.parent[qRoot] = pRoot
      this.rank[pRoot] += 1
    }
  }
}

/**
 * @description 第五版 Union-Find
 */
export class UnionFind5 implements UnionFind {
  private parent: number[]
  private rank: number[]

  constructor(size: number) {
    this.parent = new Array<number>(size)
    this.rank = new Array<number>(size)

    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i
      this.rank[i] = 1
    }
  }

  private find(p: number): number {
    if (p < 0 || p >= this.parent.length) {
      throw new Error('p is out of bound')
    }

    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }

    return p
  }

  public getSize(): number {
    return this.parent.length
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    if (pRoot === qRoot) return

    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot
    } else {
      this.parent[qRoot] = pRoot
      this.rank[pRoot] += 1
    }
  }
}

/**
 * @description 第六版 Union-Find
 */
export class UnionFind6 implements UnionFind {
  private parent: number[]
  private rank: number[]

  constructor(size: number) {
    this.parent = new Array<number>(size)
    this.rank = new Array<number>(size)

    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i
      this.rank[i] = 1
    }
  }

  private find(p: number): number {
    if (p < 0 || p >= this.parent.length) {
      throw new Error('p is out of bound')
    }

    if (p !== this.parent[p]) this.parent[p] = this.find(this.parent[p])

    return this.parent[p]
  }

  public getSize(): number {
    return this.parent.length
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    if (pRoot === qRoot) return

    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot
    } else {
      this.parent[qRoot] = pRoot
      this.rank[pRoot] += 1
    }
  }
}
