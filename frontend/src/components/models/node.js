export class Node {
  constructor(id, name, fx, fy, isFixed = false, ) {
    this.id = id
    this.name = name;
    this.fx = fx
    this.fy = fy
    this.isFixed = isFixed
  }

  setX = (fx) => {
    this.fx = fx
  }
  setY = (fy) => {
    this.fy = fy
  }
  setId = (id) => {
    this.id = id
  }

  setIsFixed = (isFixed) => {
    this.isFixed = isFixed
  }

  getX = () => {
    return this.fx
  }
  getId = () => {
    return this.id
  }
  getY = () => {
    return this.fy
  }
  getIsFixed = () => {
    return this.isFixed
  }

  getName = () => {
    return this.name
  }
}