<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup templates
 */
?>

<section id="header">
    <?php if (!empty($page['top_left']) || !empty($page['top_right'])): ?>
        <div id="top-bar" class="row">
            <div class="col-sm-6">
                <?php print render($page['top_left']); ?>
            </div>
            <div class="col-sm-6">
                <div class="row">
                    <div class="col-sm-6"><?php print render($page['top_right_1']); ?></div>
                    <div class="col-sm-6"><?php print render($page['top_right_2']); ?></div>
                </div>
            </div>
        </div>
    <?php endif; ?>
    <div id="main-nav" class="<?php print $container_class; ?>">
        <div class="row page-container">

            <div class="col-md-3">
                <div class="navbar-header">
                    <a class="logo navbar-btn" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
                        <img src="<?php print $base_path; ?>sites/all/themes/rangelands/images/svg/logo.svg"
                             onerror="this.onerror=null; this.src='<?php print $base_path; ?>sites/all/themes/rangelands/images/png/logo.png'"
                             class="logo" width="230px" height="auto">
                    </a>

                    <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
                        <button type="button" class="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    <?php endif; ?>
                </div>
            </div>

            <div class="col-md-9">
                <div class="navbar-collapse collapse">
                    <?php if (!empty($primary_nav)): ?>
                        <nav class="primary clearfix" role="navigation">
                            <?php if (!empty($primary_nav)): ?>
                                <?php print render($primary_nav); ?>
                            <?php endif; ?>
                        </nav>
                    <?php endif; ?>
                </div>
            </div>

        </div>
    </div>
    <?php if (!empty($breadcrumb)): ?>
        <nav id="breadcrumb">
            <?php print $breadcrumb; ?>
        </nav>
    <?php endif; ?>
</section>

<?php if (!empty($page['highlight'])): ?>
    <section id="highlight">
        <?php print render($page['highlighted']); ?>
    </section>
<?php endif; ?>


<section id="main" class="clearfix">
    <div class="col-sm-8 col-lg-9">
        <div id="highlight">
            <h1>International Land Coalition Rangelands Initiative</h1>
            <p>Established in 2010, the International Land Coalition (ILC)
                Rangelands Initiative facilitates learning between, and provides
                technical support to government and other actors working
                to make rangelands more tenure secure.</p>
        </div>
        <div id="about-intro">
            <p>The ILC is a membership organization, comprising 207 members
                including United Nations agencies and other multilateral institutions,
                CGIAR centres and other research organizations, non-governmental
                organizations, land rights networks, civil society organizations. ILC
                members seek to realize land governance for and with people at
                country level, responding to the needs and protecting the rights of the
                women, men and communities living on and from the land.</p>
            <p>
                ILC supports its members to achieve this through the implementation
                of three strategic objectives: connecting members to each other
                and to change makers beyond the Coalition, creating opportunities
                for dialogue, mutual learning, and joint action; mobilizing members
                by facilitating informed and effective action, through accessible and
                useable knowledge and tools, and by creating opportunities for
                innovation, piloting and scaling up; and influencing key decision makers,
                including governments, partners, and corporate actors and investors
                to engage with civil society as legitimate and necessary interlocutors
                and partners in achieving land governance for and with people.
            </p>
        </div>
    </div>

    <div class="col-sm-4 col-lg-3">
        <div id="we-are" class="focus">
            <div class="description">
                <h3>Connect</h3>
                <p>ILC connects members with each other and change-makers beyond the Coaltion</p>
            </div>
        </div>
        <div id="we-want" class="focus">
            <div class="description">
                <h3>Mobilise</h3>
                <p>ILC mobilises members by reinforcing and equipping their efforts with the necessary
                    knowledge, capacity, and opportunities</p>
            </div>
        </div>
        <div id="we-seek" class="focus">
            <div class="description">
                <h3>Influence</h3>
                <p>ILC influences key decision-makers, including governments, their partners and
                    corporate actors</p>
            </div>
        </div>
    </div>
</section>


<footer id="footer">
    <div class="page-container <?php print $container_class; ?>">
        <?php if (!empty($page['footer_col_1']) || !empty($page['footer_col_2']) || !empty($page['footer_col_3'])): ?>
            <div class="row">

                <div class="col-sm-4">
                    <?php if (!empty($secondary_nav) || !empty($page['footer_col_1'])): ?>
                        <?php print render($page['footer_col_1']); ?>
                    <?php endif; ?>
                </div>

                <div class="col-sm-4">
                    <?php if (!empty($page['footer_col_2'])): ?>
                        <?php print render($page['footer_col_2']); ?>
                    <?php endif; ?>
                </div>

                <div class="col-sm-4 pull-right text-right">
                    <?php if (!empty($page['footer_col_3'])): ?>
                        <?php print render($page['footer_col_3']); ?>
                    <?php endif; ?>
                </div>

            </div>
        <?php endif; ?>
        <?php if (!empty($page['footer'])): ?>
            <div class="row">
                <div class="col-md-12">
                    <?php print render($page['footer']); ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</footer>