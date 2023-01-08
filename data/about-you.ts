import { Question } from "../types"
import z from "zod"

const questions: Question[] = [
  {
    label:
      "Remind us in a few words your history with the Transcontinental Race (just in case we've forgotten).",
    hint: "This may be racing or volunteering with us in the past. Please keep your answer to one short paragraph.",
    type: "textarea",
    name: "your-history",
    required: true,
  },
  {
    label: "Have you taken part in any self supported ultra-race before?",
    hint: "Choose yes if you have competed in any UNSUPPORTED ultra distance race in any sport discipline.",
    type: "radio",
    options: ["Yes", "No"],
    name: "taken-part-before-self-supported",
    required: true,
  },
  {
    label: "Have you taken part in any other kind of ultra-race before?",
    hint: "Choose yes if you have competed in any ultra distance race in any sport discipline.",
    type: "radio",
    options: ["Yes", "No"],
    name: "taken-part-before-other",
    required: true,
  },
  {
    label:
      "Do you have experience of solo self supported travel or expeditions with or without a bike?",
    hint: "Choose yes if you have completed any SOLO UNSUPPORTED adventure in any discipline.",
    type: "radio",
    options: ["Yes", "No"],
    name: "any-solo-experience",
    required: true,
  },
  {
    label: "Please give brief details of your most relevant experience.",
    hint: "We want to hear about your most relevant experience in any self supported ultra-race, or any other kind of ultra-race or any experience of solo (or pairs/small group) self supported travel or expeditions with or without a bike. We don't want to hear about your training or daily commute to work. Please keep your answer to a couple of short paragraphs maximum.",
    type: "textarea",
    name: "relevant-experience",
    required: true,
  },
  {
    label:
      " What would best describe your feelings about fitness and training for Transcontinental No.8?",
    hint: "Just be honest, there are no wrong answers!",
    type: "radio",
    options: [
      "Race shape is never far away",
      "I'm confident of a good show",
      "I'm generally fit but have some work to do, this would be a step up",
      "I'm not sure, it could go either way, but that's what makes it an adventure",
      "I have a mountain to climb, but I'll get there",
      "I'm terrified, what have I done.",
    ],
    name: "fitness",
    required: true,
  },
  {
    label: "The bike I will ride on the race is best described as...",
    hint: "Any standard commercially available solo upright bike is permitted with reasonable personal modifications. This is however, a race and we want riders to have a fair and comparable equipment baseline for a credible athletic and strategic competition. Equipment should not provide such a dividing line in performance such that there is no reasonable comparison of two rider's efforts.",
    type: "radio",
    options: [
      "Standard upright bike",
      "Tandem",
      "Recumbent",
      "Handcycle",
      "Folding bike",
      "Bike and trailer",
    ],
    name: "bike-type",
    required: true,
    validates: z
      .string({
        invalid_type_error: "This is a required question",
        required_error: "This is a required question",
      })
      .refine(
        val => val === "Standard upright bike",
        `We will need to know a bit more information from you to understand if this race is for you. Please email us on mail@lostdot.cc`
      ),
  },
]

export default questions
