function assertTrue(condition: boolean): asserts condition {
  if (!condition) {
    throw new Error();
  }
}

export { assertTrue as assertTrue };
