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

export async function fetchAuth(name: string, password: string) {
  return fetchData("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, password: password }),
  });
}

export async function fetchLecturer(id: string) {
  return fetchData(`http://localhost:8080/api/lecturers/${id}`);
}

export async function fetchLecturerPack(page: number, limit: number) {
  // return fetchData(`http://localhost:8080/api/lecturers/main/${page}`, {cache: "no-store"});
  return fetchData(`http://localhost:8080/api/lecturers/main/${page}?limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      limit: limit,
    },
  });
}

export async function fetchReservationGet(uuid: string, date: string) {
  return fetchData(`http://localhost:8080/api/reserve/${uuid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Reserved-Day": date },
  });
}

export async function fetchReservationPost(
  uuid: string,
  name: string,
  email: string,
  phone: string,
  date: string,
  time: string,
  online: boolean,
  place: string,
  note: string
) {
  return fetchData(`http://localhost/api/reserve/${uuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, email: email, phone: phone, date: date, time: time, online: online, place: place, note: note }),

    //body: JSON.stringify({ tag: tagsArray, loc: locationsArray, min_max: priceArray }),
  });
}

export async function getMetadata() {
  return fetchData(`http://localhost/api/lecturers/metadata`);
}
