export class TrackStateTree {
  constructor(master) {
    this.pathDependencies = new Set()
    this.shouldTrack = false
    this.master = master
    this.proxifier = master.proxifier
    this.state = master.state
  }
  canMutate() {
    return false
  }
  pause() {
    console.log("pauseeee")
    this.shouldTrack = false
  }
  resume() {
    console.log("resumeeee")
    this.shouldTrack = true
  }
  canTrack() {
    return true
  }
  addTrackingPath(path) {
    if (!this.shouldTrack) {
      return
    }
    this.pathDependencies.add(path)
    if (this.callback) {
      this.master.addPathDependency(path, this.callback)
    }
  }
  track(cb) {
    this.master.changeTrackStateTree(this)
    this.shouldTrack = true
    setTimeout(() => (this.shouldTrack = false))
    if (this.callback) {
      for (let path of this.pathDependencies) {
        this.master.removePathDependency(path, this.callback)
      }
    }
    this.pathDependencies.clear()
    if (cb) {
      this.callback = (...args) => {
        if (!this.callback) {
          return
        }
        cb(...args)
      }
    }
    return this
  }
  trackScope(scope, cb) {
    const previousPreviousTree = this.master.previousTree
    const previousCurrentTree = this.master.currentTree
    this.master.currentTree = this
    this.track(cb)
    const result = scope(this)
    this.master.currentTree = previousCurrentTree
    this.master.previousTree = previousPreviousTree
    return result
  }
  dispose() {
    if (!this.callback) {
      this.pathDependencies.clear()
      return this
    }
    for (let path of this.pathDependencies) {
      this.master.removePathDependency(path, this.callback)
    }
    this.pathDependencies.clear()
    this.callback = null
    if (this.master.currentTree === this) {
      this.master.currentTree = null
    }
    return this
  }
}
//# sourceMappingURL=TrackStateTree.js.map
