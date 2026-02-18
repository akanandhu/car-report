import Accordion from '@/src/components/Accordion'
import ImageUpload from '@/src/components/ImageUpload'
import React, { useState } from 'react'
import useFrontLeft from './useHook';
import { PARTS } from './helper';
import Input from '@/src/components/Input';
import RadioButton from '@/src/components/Radio';

const FrontLeft = () => {
    const {
    selectedConditions,
    isMajor,
    toggleCondition,
    updateOtherText,
    handleFile,
    isGood
  } = useFrontLeft();
  const [value, setValue] = useState("");
    const accordionItems = PARTS.map((part) => {
    return ({
    title: part.name,
    badge:
      selectedConditions(part.name).length > 0 ? (
        <span
          className={`text-xs px-3 py-1 rounded-full ${
           isGood(part.name) ? "bg-green-100 text-green-700" : isMajor(part.name)
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isGood(part.name) ? "Good Condition" : isMajor(part.name) ? "Major Issue" : "Minor Issue"}
        </span>
      ) : null,

    children: (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {part.conditions.map((cond) => {
            const active = selectedConditions(part.name).includes(cond);
            const locked =
              (selectedConditions(part.name).includes("Good") &&
                cond !== "Good") ||
              (selectedConditions(part.name).includes("Working") &&
                cond !== "Working");

            return (
              <button
                key={cond}
                disabled={locked}
                onClick={() => toggleCondition(part.name, cond)}
                className={`px-3 py-1 rounded-full text-sm border transition
                  ${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }
                  ${
                    locked
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-blue-100"
                  }
                `}
              >
                {cond}
              </button>
            );
          })}
        </div>
        {selectedConditions(part.name).includes("Other") && (
          <Input
            placeholder="Enter observation..."
            value={""}
            name={part.name}
            onChange={(e) => updateOtherText(part.name, e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        )}

        {selectedConditions(part.name).includes("Not Available") && (
          <p className="text-sm italic text-gray-500">
            This part will not appear in bidding app.
          </p>
        )}
      </div>
    ),
  })});
  return (
    <div>
          <h2 className="text-md font-bold text-gray-900 mb-2">
            Upload Front Left Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {["Front View *", "Left Angle", "Right Angle", "Damage Shot"].map(
              (label, i) => (
                <div key={label}>
                  <ImageUpload label={label} onFileSelect={handleFile} />
                </div>
              ),
            )}
          </div>
          <Accordion items={accordionItems} />
          <div className='mt-4'>

          <Input
            placeholder="Wiper Blades, Missing Emblems, etc..."
            label="Missing Parts"
            value={""}
            name="ob"
            // onChange={(e) => updateOtherText(part.name, e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            </div>

      {/* YES */}
      <label className='block text-sm font-bold text-gray-900 mb-2 mt-3'>Full Body Repaint</label>
            <div className="flex gap-6">
      <RadioButton
        id="yes"
        name="spareWheel" // ✅ Same name makes it exclusive
        label="Yes"
        value="yes"
        checked={value === "yes"}
        onChange={() => setValue("yes")}
      />

      {/* NO */}
      <RadioButton
        id="no"
        name="spareWheel"
        label="No"
        value="no"
        checked={value === "no"}
        onChange={() => setValue("no")}
      />
    </div>
        </div>
  )
}

export default FrontLeft