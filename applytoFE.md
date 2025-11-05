🖥️ Frontend Integration

In your YearConfiguration.jsx, inside the Actions column (where Edit/Delete buttons are), add a new “Reports” dropdown or two buttons.

Replace this block in table row actions:

<div className="flex space-x-2">
  <button onClick={() => handleEdit(config)} className="text-blue-600 hover:text-blue-900">
    <FaEdit />
  </button>
  <button onClick={() => handleDelete(config._id)} className="text-red-600 hover:text-red-900">
    <FaMinus />
  </button>
  <button className="text-green-600 hover:text-green-900">
    <FaToggleOn />
  </button>
</div>


with this upgraded version:

<div className="flex flex-col space-y-1">
  <div className="flex space-x-2">
    <button onClick={() => handleEdit(config)} className="text-blue-600 hover:text-blue-900">
      <FaEdit />
    </button>
    <button onClick={() => handleDelete(config._id)} className="text-red-600 hover:text-red-900">
      <FaMinus />
    </button>
  </div>

  {config.examSchedules.map((exam) => (
    <div key={exam.exam} className="flex justify-between mt-1">
      <button
        onClick={() => window.open(`/api/year-configurations/${config._id}/exam/${exam.exam}/attendance`)}
        className="text-sm text-purple-600 hover:underline"
      >
        {exam.exam} Attendance
      </button>
      <button
        onClick={() => window.open(`/api/year-configurations/${config._id}/exam/${exam.exam}/marks`)}
        className="text-sm text-orange-600 hover:underline"
      >
        Marks Sheet
      </button>
    </div>
  ))}
</div>