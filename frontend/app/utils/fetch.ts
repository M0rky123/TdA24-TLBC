async function fetchData(url: string, options = {}) {
  try {
    //  const response = await fetch(url, options);
    const response = await fetch("http://localhost" + url, options);

    if (!response.ok) {
      // throw page not found error
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
  }
}

export async function editLecturer(
  uuid: string,
  auth_key: string,
  titleB: string,
  fName: string,
  mName: string,
  lName: string,
  titleA: string,
  loc: string,
  claim: string,
  bio: string,
  tags: string[],
  price: number,
  contact: { tels: string[]; emails: string[] }
) {
  return fetchData(`/api/lecturers/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_key: auth_key,
      title_before: titleB,
      first_name: fName,
      middle_name: mName,
      last_name: lName,
      title_after: titleA,
      location: loc,
      claim: claim,
      bio: bio,
      tags: tags,
      price_per_hour: price,
      contact: contact,
    }),
  });
}

export async function fetchReservations(uuid: string) {
  return fetchData(`/api/lecturers/${uuid}/reservations`, { method: "GET", headers: { "Content-Type": "application/json" } });
}

export async function fetchFreeReservationHours(uuid: string, month?: string, year?: string) {
  return fetchData(`/api/reservations/${uuid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", month: month, year: year },
  });
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
  return fetchData(`/api/lecturers/${id}`);
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

export async function fetchReservationGet(uuid: string, date: string) {
  return fetchData(`/api/reserve/${uuid}`, {
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
  return fetchData(`/api/reserve/${uuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, email: email, phone: phone, date: date, time: time, online: online, place: place, note: note }),

    //body: JSON.stringify({ tag: tagsArray, loc: locationsArray, min_max: priceArray }),
  });
}

export async function getMetadata() {
  return fetchData(`/api/lecturers/metadata`);
}
