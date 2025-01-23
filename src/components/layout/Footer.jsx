import React, { Fragment } from "react";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { Footer as FlowbiteFooter } from "flowbite-react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logos/logo.png";
import { BRAND_NAME_NORMAL } from "../../Constants";


function Footer(props) {
	const { isAuthenticated } = props;

    return (
        <>
        { isAuthenticated === false ?
		    <FlowbiteFooter className="rounded-none bg-gray-50 pb-8 pt-16 shadow-none">
		      <div className="mx-auto w-full max-w-8xl px-4">
		        <div className="grid w-full justify-between gap-8 md:grid-cols-2">
		          <div className="mb-4 max-w-sm lg:mb-0">
		            <Link href="/" className="flex items-center gap-3">
		              <img alt="" height="32" src={logo} className="w-16" />
		              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">{ BRAND_NAME_NORMAL }</span>
		            </Link>
		            <p className="mb-3 mt-4 max-w-sm text-gray-600 dark:text-gray-400">
		              { BRAND_NAME_NORMAL } is an ecosystem built on top of Tailwind CSS including a component library, block sections, a
		              Figma design system and other resources.
		            </p>
		            <p className="mb-3 mt-4 max-w-sm text-gray-600 dark:text-gray-400">
		              Code licensed{" "}
		              <a
		                href="https://github.com/themesberg/flowbite-react/blob/main/LICENSE"
		                rel="nofollow noopener noreferrer"
		                target="_blank"
		                className="text-cyan-600 hover:underline"
		              >
		                MIT
		              </a>
		              , docs{" "}
		              <a
		                href="https://creativecommons.org/licenses/by/3.0/"
		                rel="nofollow noopener noreferrer"
		                target="_blank"
		                className="text-cyan-600 hover:underline"
		              >
		                CC BY 3.0
		              </a>
		            </p>
		          </div>
		          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
		            <div>
		              <FlowbiteFooter.Title
		                title="Resources"
		                className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
		              />
		              <FlowbiteFooter.LinkGroup col className="text-gray-600 dark:text-gray-400">
		                <FlowbiteFooter.Link
		                  href="https://github.com/themesberg/flowbite-react"
		                  rel="noopener"
		                  target="_blank"
		                  className="text-base"
		                >
		                  GitHub
		                </FlowbiteFooter.Link>
		                <FlowbiteFooter.Link href="https://flowbite.com/" rel="noopener" target="_blank" className="text-base">
		                  { BRAND_NAME_NORMAL }
		                </FlowbiteFooter.Link>
		                <FlowbiteFooter.Link
		                  href="https://tailwindcss.com/"
		                  rel="nofollow noopener noreferrer"
		                  target="_blank"
		                  className="text-base"
		                >
		                  Tailwind CSS
		                </FlowbiteFooter.Link>
		                <FlowbiteFooter.Link href="https://flowbite.com/figma/" rel="noopener" target="_blank" className="text-base">
		                  Figma
		                </FlowbiteFooter.Link>
		              </FlowbiteFooter.LinkGroup>
		            </div>
		            <div>
		              <FlowbiteFooter.Title
		                title="Help & Support"
		                className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
		              />
		              <FlowbiteFooter.LinkGroup col className="text-gray-600 dark:text-gray-400">
		                <FlowbiteFooter.Link
		                  href="https://discord.gg/4eeurUVvTy"
		                  rel="nofollow noopener noreferrer"
		                  target="_blank"
		                  className="text-base"
		                >
		                  Discord
		                </FlowbiteFooter.Link>
		                <FlowbiteFooter.Link
		                  href="https://github.com/themesberg/flowbite-react/discussions"
		                  rel="noopener"
		                  target="_blank"
		                  className="text-base"
		                >
		                  Github Discussions
		                </FlowbiteFooter.Link>
		              </FlowbiteFooter.LinkGroup>
		            </div>
		            <div>
		              <FlowbiteFooter.Title
		                title="Legal"
		                className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
		              />
		              <FlowbiteFooter.LinkGroup col className="text-gray-600 dark:text-gray-400">
		                <FlowbiteFooter.Link href="https://flowbite.com/license/" rel="noopener" target="_blank" className="text-base">
		                  License
		                </FlowbiteFooter.Link>
		                <FlowbiteFooter.Link href="https://flowbite.com/brand/" rel="noopener" target="_blank" className="text-base">
		                  Brand guideline
		                </FlowbiteFooter.Link>
		              </FlowbiteFooter.LinkGroup>
		            </div>
		          </div>
		        </div>
		        <FlowbiteFooter.Divider />
		        <div className="w-full text-center sm:flex sm:items-center sm:justify-center">
		          <FlowbiteFooter.Copyright
		            by={"All Rights Reserved. "+BRAND_NAME_NORMAL+"™ is a registered trademark."}
		            href="/"
		            year={new Date().getFullYear()}
		            className="text-base"
		          />
		        </div>
		      </div>
		    </FlowbiteFooter>
		    :
		    <FlowbiteFooter className="bottom-0 rounded-none bg-gray-50 pt-0 mt-0 pb-8 shadow-none">
		      <div className="mx-auto w-full max-w-8xl px-4">
		        <FlowbiteFooter.Divider />
		        <div className="w-full text-center sm:flex sm:items-center sm:justify-center">
		          <FlowbiteFooter.Copyright
		            by={"All Rights Reserved. "+BRAND_NAME_NORMAL+"™ is a registered trademark."}
		            href="/"
		            year={new Date().getFullYear()}
		            className="text-base"
		          />
		        </div>
		      </div>
		    </FlowbiteFooter>
		}
        </>
    )
}

Footer.propTypes = {
    isAuthenticated: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
})

export default connect(mapStateToProps, null)(Footer);
