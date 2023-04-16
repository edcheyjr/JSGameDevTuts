/**
 * Checks if two rectangle collide or not
 * @param {*} rect
 * @param {*} rect2
 * @returns
 */

function checkRectangleCollusion(rect, rect2) {
  if (
    rect.x > rect2.x + rect2.width ||
    rect.x + rect2.width < rect2.x ||
    rect.y > rect2.y + rect2.height ||
    rect.y + rect.height < rect2.y
  ) {
    // no collusion
    return false
  } else {
    // collusion detected
    return true
  }
}
/**
 * Checks for circle collusion
 * ---------------------------
 * @description tacks 2 circle {Circle} objects and test for the collusion
 * @example
 * const isCollided = checkCircleCollusion(circle1, circle2)
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @returns
 */
function checkCircleCollusion(circle1, circle2) {
  const opp = circle1.x - circle2.x
  const adj = circle1.y - circle2.y
  const hypo = Math.sqrt(opp * opp + adj * adj)
  const sumRadii = circle1.radius + circle2.radius
  if (hypo < sumRadii) {
    return true
  } else if (hypo === sumRadii) {
    // collusion
    console('touching')
    return true
  } else {
    return false
  }
}
/**
 * interpolation fxn
 * @param {*} A start position
 * @param {*} B last position
 * @param {*} t percentage difference between the positions
 * @returns {int} position btwn postions A and B
 */
function lerp(A, B, t) {
  return A + (B - A) * t
}

/**
 * intersection fxn
 * ----------------
 * @description takes vectors A to B AND C to D and find where they intersect otherwise returns null if not co-ordinates
 * @param {*} A start.x
 * @param {*} B start.y
 * @param {*} C end.x
 * @param {*} D end.y
 * @returns {object | null} with x,y positions from the interection of the object against the sensors and the offset
 */
function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

  if (bottom != 0) {
    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      }
    }
  }
  return null
}
/**
 * Test for intersection
 *-----------------------
 * @description test if two polygon{Rectangle, Circle e.t.c} intersect and return a boolean between two polygon
 * @param {number[]} poly1 polygon one
 * @param {number[]} poly2 polygon two
 * @returns {bool} true | false depending if whether the two polygon intersect
 */
function polysIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      )
      if (touch) {
        return true
      }
    }
  }
  return false
}
