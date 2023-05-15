import FormField from "../components/FormField";
import { useState } from "react";

export default function CreateCampaign() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  const handleFormFieldChange = (field, e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form");
  };

  return (
    <div className="flex flex-col justify-center bg-slate-600 rounded-[10px] mx-20 my-10 p-5">
      <div className="flex justify-center items-center p-[16px] rounded-[10px]">
        <h1 className="text-[18px] leading-[38px] text-black">
          Start a campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[30px] gap-[15px] w-full"
      >
        <FormField
          labelName="Campaign Title*"
          placeholder="Name of campaign"
          inputType="text"
          value={form.value}
          handleChange={(e) => handleFormFieldChange("title", e)}
        />

        <FormField
          labelName="Story*"
          placeholder="Write your story"
          isTextArea={true}
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal*"
            placeholder="MATIC 1.00"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            labelName="End Date*"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
      </form>
    </div>
  );
}
