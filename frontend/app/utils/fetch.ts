async function fetchData(url: string, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
  }
}

export async function fetchFilter(tagsArray: string[], locationsArray: string[], priceArray: number[]) {
  return fetchData("/api/lecturers/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag: tagsArray, loc: locationsArray, min_max: priceArray }),
  });
}

export async function fetchLecturer(id: string) {
  return fetchData(`http://localhost/api/lecturers/${id}`);
}

export async function fetchLecturerPack(page: number, limit: number) {
  // return fetchData(`http://localhost:8080/api/lecturers/main/${page}`, {cache: "no-store"});
  return fetchData(`/api/lecturers/main/${page}?limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      limit: limit,
    },
  });
}

export async function getMetadata() {
  return fetchData(`http://localhost:8080/api/lecturers/metadata`);
}
