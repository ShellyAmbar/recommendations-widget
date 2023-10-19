const myApp = require("./script");

test("fetchData resolves with the expected data", async () => {
  // Arrange: Set up the test, for example, by using mock data.
  const mockData = {list: []};

  // Mock the fetch function to return a resolved Promise with the mock data
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );

  // Act: Call the function and await the Promise
  const result = await myApp.fetchRecommendations();

  // Assert: Check if the result matches the expected data
  expect(result).toEqual(mockData);

  // Clean up: Clear the fetch mock to avoid affecting other tests
  global.fetch.mockClear();
});

test("fetchData rejects with an error when the network response is not ok", async () => {
  // Arrange: Set up the test to return a failed network response
  global.fetch = jest.fn(() => Promise.resolve({ok: false}));

  // Act and Assert: Use try-catch to test the rejection
  try {
    await myApp.fetchRecommendations();
  } catch (error) {
    expect(error.message).toBe("Network response was not ok");
  }

  // Clean up: Clear the fetch mock to avoid affecting other tests
  global.fetch.mockClear();
});
