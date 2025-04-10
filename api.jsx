export const apiBase = 'http://localhost:8080/api'; // Update if different

export async function submitAPI1(data) {
  const response = await fetch(`${apiBase}/endpoint1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ neid: data.neid,    timeRange: data.timeRange }),
  });
  return response.text();
}

export async function submitAPI2(data) {
  const response = await fetch(`${apiBase}/endpoint2`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      neid: data.neid,
      //timeRange: data.timeRange,
      fromTimestamp:data.fromTimestamp,
      toTimestamp:data.toTimestamp,
      portname: data.portname,
    }),
  });
  return response.text();
}

export async function submitAPI3(data) {
  const response = await fetch(`${apiBase}/endpoint3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      neid: data.neid,
      //timeRange: data.timeRange,
      fromTimestamp:data.fromTimestamp,
      toTimestamp:data.toTimestamp,
      portname: data.portname,
      monType: data.monType,
    }),
  });
  return response.text();
}




{/*
export const submitForm = async (payload) => {
  const response = await fetch('http://localhost:8080/api/form-data-all', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }
	

  return await response.text();
};

*/}


export const fetchFormData = async () => {
  const response = await fetch("http://localhost:8080/api/endpoints");

  if (!response.ok) {
    throw new Error("Failed to fetch form data");
  }

  const data = await response.json();
  return data;
};
