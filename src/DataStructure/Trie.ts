/**
 * @description Trie 节点类
 */
export class TrieNode {
  isWord: boolean
  next: Map<string, TrieNode>

  constructor(isWord: boolean = false) {
    this.isWord = isWord
    this.next = new Map<string, TrieNode>()
  }
}

/**
 * @description Trie 字典树
 */
export class Trie {
  private root: TrieNode
  private size: number

  constructor() {
    this.root = new TrieNode()
    this.size = 0
  }

  public getSize(): number {
    return this.size
  }

  public insert(word: string): void {
    let current = this.root

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i)

      if (!current.next.get(char)) current.next.set(char, new TrieNode())
      current = current.next.get(char) as TrieNode
    }

    if (!current.isWord) {
      current.isWord = true
      this.size++
    }
  }

  public search(word: string): boolean {
    let current = this.root

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i)

      if (!current.next.get(char)) return false
      current = current.next.get(char) as TrieNode
    }

    return current.isWord
  }

  public startWith(prefix: string): boolean {
    let current = this.root

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix.charAt(i)

      if (!current.next.get(char)) return false
      current = current.next.get(char) as TrieNode
    }

    return true
  }
}
