import linearAlgebra from "linear-algebra"

const { Matrix, Vector } = linearAlgebra()

export default class PowerRanker {
  items
  matrix
  verbose

  constructor(items, votes, verbose) {
    if (items.size < 2) {
      throw new Error("PowerRanker: Cannot rank less than two items")
    }

    this.items = items
    this.matrix = this.#toMatrix(items, votes)
    this.verbose = verbose
  }

  #log(msg) {
    if (this.verbose) {
      console.info(msg)
    }
  }

  run(d = 1, epsilon = 0.001, nIter = 1000) {
    const weights = this.#powerMethod(this.matrix, d, epsilon, nIter)
    return this.#applyLabels(this.items, weights)
  }

  #applyLabels(items, eigenvector) {
    const itemMap = this.#toItemMap(items)
    if (itemMap.size !== eigenvector.length) {
      throw new Error("Mismatched arguments!")
    }
    itemMap.forEach((ix, item) => itemMap.set(item, eigenvector[ix]))
    return itemMap
  }

  #toMatrix(items, votes) {
    const n = items.size
    const itemMap = this.#toItemMap(items)

    const matrix = Matrix.zero(n, n).plusEach(1).minus(Matrix.identity(n))

    // Add the votes to the off-diagonals
    // Recall that vote > 0.5 is flow towards, vote < 0.5 is flow away
    votes.forEach((p) => {
      const alphaIx = itemMap.get(p.alpha)
      const betaIx = itemMap.get(p.beta)
      if (alphaIx !== undefined && betaIx !== undefined) {
        matrix.data[betaIx][alphaIx] += p.vote
        matrix.data[alphaIx][betaIx] += 1 - p.vote
      }
    })

    // Add the diagonals (sums of columns)
    this.#sumColumns(matrix).map((sum, ix) => (matrix.data[ix][ix] = sum))
    return matrix
  }

  // O(n^3)-ish
  #powerMethod(matrix, d = 1, epsilon = 0.001, nIter = 1000) {
    if (matrix.rows !== matrix.cols) {
      throw new Error("Matrix must be square!")
    }
    const n = matrix.rows

    // Normalize matrix
    matrix = matrix.clone()

    matrix.data = matrix.data.map((row) => {
      const rowSum = this.#sum(row)
      return row.map((x) => x / rowSum)
    })

    // Add damping factor
    matrix.mulEach_(d)

    matrix.plusEach_((1 - d) / n)

    // Initialize eigenvector to uniform distribution
    let eigenvector = Vector.zero(n).plusEach(1.0 / n)

    // Power method
    let i
    let prev = eigenvector

    for (i = 0; i < nIter; i++) {
      eigenvector = prev.dot(matrix)
      if (this.#norm(eigenvector.minus(prev).data[0]) < epsilon) break
      prev = eigenvector
    }

    return eigenvector.data[0]
  }

  #toItemMap(items) {
    return new Map(
      Array.from(items)
        .sort((a, b) => a - b)
        .map((item, ix) => [item, ix])
    )
  }

  #norm(array) {
    return Math.sqrt(this.#sum(array.map((x) => x * x)))
  }

  #sum(array) {
    return array.reduce((sumSoFar, val) => sumSoFar + val, 0)
  }

  #sumColumns(matrix) {
    return matrix.trans().data.map((col) => this.#sum(col))
  }
}