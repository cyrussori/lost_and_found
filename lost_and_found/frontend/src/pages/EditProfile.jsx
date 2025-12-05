import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 import axios from "axios";

export default function EditProfile({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const nav = useNavigate();

  // Load current user into the form
  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

async function handleSave(e) {
  e.preventDefault();
  setSaving(true);
  setErr(null);

  try {
    const { data } = await axios.post(
      "http://localhost:5050/api/users/me/update",
      form,
      { withCredentials: true } // sends session cookies
    );

    setCurrentUser(data.user);
    nav(`/profile/${data.user.id}`);
  } catch (err) {
    console.error("Update error:", err);
    setErr("Unable to update profile.");
  } finally {
    setSaving(false);
  }
}


  return (
    <div className="editProfileWrapper">
      <h2>Edit Profile</h2>

      <form onSubmit={handleSave} className="editProfileForm">
        <label>
          Full Name
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </label>

        {err && <p className="error">{err}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button type="button" onClick={() => nav(`/profile/${currentUser.id}`)}>
            Cancel
        </button>
      </form>
    </div>
  );
}
