import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";

import { AvailabiltyBadge, CodeBadge, StatusBadge } from "./";

storiesOf("Badges", module).add("Default", () => (
  <div className="container storybook">
    <h1>Badges</h1>
    <h2>Various badges used across the app</h2>

    <div className="block">
      <h3>Availabilty Badge</h3>
      <p className="mt-10">Used to show availability of trains</p>
      <div className="demo mt-10">
        <div className="flex flex-middle flex-around">
          <AvailabiltyBadge count={123} type="Available" />
          <AvailabiltyBadge count={13} type="Waitlist" />
          <AvailabiltyBadge count={9} type="R.A.C" />
          <AvailabiltyBadge type="N/A" />
        </div>
      </div>
    </div>

    <div className="block">
      <h3>Code Badge</h3>
      <p className="mt-10">Used to show station/airport codes etc.</p>
      <div className="demo mt-10">
        <div className="flex flex-middle flex-center flex-middle">
          <CodeBadge label="PNQ" size="regular" className="pd-20" />
          <CodeBadge label="2" size="tiny" className="ml-20" />
        </div>
      </div>
    </div>

    <div className="block">
      <h3>Status Badge</h3>
      <p className="mt-10">Used to show station/airport codes etc.</p>
      <div className="demo mt-10">
        <div className="flex flex-middle flex-center flex-middle">
          <StatusBadge label="on time" className="ml-20" />
        </div>
      </div>
    </div>

    <div className="block ">
      <h3>Availabilty Badge Attributes</h3>
      <table className="">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Description</th>
            <th>Type</th>
            <th>Accepted Vaues</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>type</code>
            </td>
            <td>Sets the color of the badge</td>
            <td>String</td>
            <td>"N/A", "Available", "Waitlist", "R.A.C"</td>
            <td>""</td>
          </tr>
          <tr>
            <td>
              <code>count</code>
            </td>
            <td>Sets the count on the badge</td>
            <td>Number</td>
            <td>Any number</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="block ">
      <h3>Code Badge Attributes</h3>
      <table className="">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Description</th>
            <th>Type</th>
            <th>Accepted Vaues</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>label</code>
            </td>
            <td>The text to display in the badge</td>
            <td>String</td>
            <td>Any String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>
              <code>size</code>
            </td>
            <td>Specifies the size of the badge</td>
            <td>String</td>
            <td>"tiny"</td>
            <td>-</td>
          </tr>
          <tr>
            <td>
              <code>className</code>
            </td>
            <td>Any additional class to be applied</td>
            <td>String</td>
            <td>Any String</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="block ">
      <h3>Status Badge Attributes</h3>
      <table className="">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Description</th>
            <th>Type</th>
            <th>Accepted Vaues</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>className</code>
            </td>
            <td>Sets class on status</td>
            <td>String</td>
            <td>Any String</td>
            <td>""</td>
          </tr>
          <tr>
            <td>
              <code>label</code>
            </td>
            <td>The text to display in the badge</td>
            <td>String</td>
            <td>Any String</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
));
