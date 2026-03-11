const API = "http://localhost:5000/api/leads";

async function addLead() {
  const lead = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    source: document.getElementById("source").value,
    notes: document.getElementById("notes").value
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead)
  });

  loadLeads();
}

async function loadLeads() {
  const res = await fetch(API);
  const leads = await res.json();

  const container = document.getElementById("leadList");
  container.innerHTML = "";

  leads.forEach(lead => {
    container.innerHTML += `
      <div class="lead-card">
        <h3>${lead.name}</h3>
        <p>Email: ${lead.email}</p>
        <p>Source: ${lead.source}</p>
        <p>Status: 
          <select onchange="updateStatus('${lead._id}', this.value)">
            <option ${lead.status==="New"?"selected":""}>New</option>
            <option ${lead.status==="Contacted"?"selected":""}>Contacted</option>
            <option ${lead.status==="Converted"?"selected":""}>Converted</option>
          </select>
        </p>
        <p>Notes: ${lead.notes}</p>
        <button onclick="deleteLead('${lead._id}')">Delete</button>
      </div>
    `;
  });
}

async function updateStatus(id, status) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  loadLeads();
}

async function deleteLead(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  loadLeads();
}

loadLeads();
